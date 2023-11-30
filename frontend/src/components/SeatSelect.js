import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SeatSelect.css';

const createSeatGrid = (startNum, totalSeats, onSeatClick, selectedSeat, seatStatuses) => {
  let seats = [];
  for (let i = startNum; i < startNum + totalSeats; i++) {
    const isSelected = i === selectedSeat;
    const isUnavailable = seatStatuses[i] === 'Unavailable';
    seats.push(
      <div 
        className={`seat ${isSelected ? 'selected' : ''}`} 
        key={`seat-${i}`} 
        onClick={() => !isUnavailable && onSeatClick(i)}>
        {i}
      </div>
    );
  }
  return <div className="seat-grid">{seats}</div>;
};

function SeatSelect() {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(null); // Now just a single value, not a Set
  const [seatStatuses, setSeatStatuses] = useState({});

  useEffect(() => {
    // Fetch seat statuses from the backend
    const fetchSeatStatuses = async () => {
      const response = await fetch('/api/seats/status/:flightId'); // Adjust API endpoint as needed
      const data = await response.json();
      setSeatStatuses(data); // Assuming data is an object with seat numbers as keys and statuses as values
    };

    fetchSeatStatuses();
  }, []);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat(seatNumber); // Directly set the selected seat
  };

  const handlePaymentClick = () => {
    // Pass the selected seat to the payment page
    navigate('/payment', { state: { selectedSeat } });
  };

  return (
    <div>
      <h1>Seat Selection</h1>
      <p>Choose your seat:</p>
      <div className="seat-selection-container">
        {createSeatGrid(1, 20, handleSeatClick, selectedSeat, seatStatuses)}
        <div className="aisle"></div>
        {createSeatGrid(21, 20, handleSeatClick, selectedSeat, seatStatuses)}
      </div>
      <button onClick={handlePaymentClick} disabled={!selectedSeat}>Proceed to Payment</button>
    </div>
  );
}

export default SeatSelect;
