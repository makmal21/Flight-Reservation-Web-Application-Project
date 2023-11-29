// SeatSelect.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../SeatSelect.css';

const createSeatGrid = (startNum, totalSeats) => {
  let seats = [];
  for (let i = startNum; i < startNum + totalSeats; i++) {
    seats.push(
      <div className="seat" key={`seat-${i}`}>
        {i}
      </div>
    );
  }
  return <div className="seat-grid">{seats}</div>;
};

function SeatSelect() {

  const navigate = useNavigate();
  const handlePaymentClick = () => {
    navigate('/payment');
  };
  
  return (
    <div>
      <h1>Seat Selection</h1>
      <p>Choose from the available seats:</p>
      <div className="seat-selection-container">
        {createSeatGrid(1, 20)} {/* Generates seats 1 to 20 */}
        <div className="aisle"></div> {/* Represents the aisle */}
        {createSeatGrid(21, 20)} {/* Generates seats 21 to 40 */}
      </div>
      <button onClick={handlePaymentClick}>Proceed to Payment</button> 
    </div>
  );
}

export default SeatSelect;
