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

  // UniqueID for seatID
  const generateUniqueID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters.charAt(randomIndex);
    }

    return uniqueID;
  };

  const determineSeatType = (seatNo) => {
    // logic for seat type
    if ((seatNo >= 1 && seatNo <= 4 ) || (seatNo >= 21 && seatNo <= 24 )) return "Business";
    if ((seatNo >= 5 && seatNo <= 10 ) || (seatNo >= 25 && seatNo <= 30 )) return "Comfort";
    return "Ordinary";
  };

  const handleSeatClick = (seatNo) => {

      const completeSeat = {
        SeatID: generateUniqueID(),
        SeatNo: seatNo,
        Type: determineSeatType(seatNo),
        Status: "Unavailable",
        FlightID: flightId
      };
      setSelectedSeat(completeSeat);
  };

  const handlePaymentClick = () => {
    if (selectedSeat) {
      navigate('/payment', { state: { selectedSeat: selectedSeat} }); //pushes selectedSeat as object
    } else {
      alert("Please select a available seat first.");
      }
  };

  console.log(seatStatuses);

  // Function to create seat grid
  const createSeatGrid = (startNum, endNum) => {
    let seats = [];
    for (let i = startNum; i <= endNum; i++) {
      const isSelected = selectedSeat?.SeatNo === i;
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

        <div className="section-labels">
          <span className="section-label economy">Ordinary</span>
          <span className="section-label comfort">Comfort</span>
          <span className="section-label business">Business</span>
        </div>

        {createSeatGrid(1, 20)}
        <div className="aisle"></div>
        {createSeatGrid(21, 40)}
      </div>
      <button onClick={handlePaymentClick} disabled={!selectedSeat}>Proceed to Payment</button>
    </div>
  );
  
}

export default SeatSelect;
