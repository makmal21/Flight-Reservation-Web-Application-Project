import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Using axios for API requests
import '../SeatSelect.css';

function SeatSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flightId } = location.state || {};
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatStatuses, setSeatStatuses] = useState([]);

  useEffect(() => {
    // Fetch seat statuses from the backend
    const fetchSeatStatuses = async () => {
      try {
        const response = await axios.get(`/api/seats/${flightId}`);
        setSeatStatuses(response.data); // Assuming data is an array of seat objects
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };

    if (flightId) {
      fetchSeatStatuses();
    }
  }, [flightId]);

  const handleSeatClick = (seatNo) => {
    const seat = seatStatuses.find(s => parseInt(s.SeatNo) === seatNo);
    if (seat) {
      setSelectedSeat(seat);  // Store the entire seat object
    }
  };

  const handlePaymentClick = () => {
    if (selectedSeat) {
      navigate('/payment', { state: { selectedSeat: selectedSeat, flightId: flightId } }); //pushes flightID and selectedSeat as object
    }
  };

  console.log(seatStatuses);

  // Function to create seat grid
  const createSeatGrid = (startNum, endNum) => {
    let seats = [];
    for (let i = startNum; i <= endNum; i++) {
      const isSelected = selectedSeat === i;
      const isUnavailable = seatStatuses.some(seat => parseInt(seat.SeatNo) === i && seat.Status === 'Unavailable');
  
      seats.push(
        <div 
          className={`seat ${isSelected ? 'selected' : ''} ${isUnavailable ? 'unavailable' : ''}`}
          key={`seat-${i}`} 
          onClick={() => !isUnavailable && handleSeatClick(i)}>
          {i}
        </div>
      );
    }
    return <div className="seat-grid">{seats}</div>;
  };
  
  return (
    <div>
      <h1>Seat Selection for Flight {flightId}</h1>
      <p>Choose your seat:</p>
      <div className="seat-selection-container">
        {createSeatGrid(1, 20)}
        <div className="aisle"></div>
        {createSeatGrid(21, 40)}
      </div>
      <button onClick={handlePaymentClick} disabled={!selectedSeat}>Proceed to Payment</button>
    </div>
  );
  
}

export default SeatSelect;
