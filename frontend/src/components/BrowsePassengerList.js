// BrowsePassengerList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';


function BrowsePassengerList() {

    const [flightNumber, setFlightNumber] = useState(''); // State to store the flight number
    const [showFlightNumber, setShowFlightNumber] = useState(false); // State to control display of the flight number
    const [passengerList, setPassengerList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleInputChange = (event) => {
      setFlightNumber(event.target.value); // Update the state when the input changes
      setShowFlightNumber(false); // Reset display state when input changes
      setErrorMessage('');
    };

    //send flightNumber to receive query result from backend 
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/browse-passenger-list', {flightNumber})
      .then(res => {
        console.log(res);
        if(res.data.length === 0){
          setErrorMessage('Incorrect FlightNumber or No Flights scheduled for this number. Please try again.');
        }else {
          setPassengerList(res.data);
          setShowFlightNumber(true);
        }
       
      }).catch(err => console.log(err));

    };

    return (
      <div>
        <h1>Browse Passenger List</h1>
        <form onSubmit={handleSubmit}>
          <p>Enter flight number:</p>
          <input 
            type="text" 
            value={flightNumber} 
            onChange={handleInputChange} 
            placeholder="Flight Number"
          />
          <button type= "submit">Search</button>
        </form>
        
        {/* Conditionally display the entered flight number */}
        {showFlightNumber && <p>{flightNumber}</p>}
        {/* OK. so we want to send 'flightnumber' to the database do an SQL query and
        select all passengers where FlightID = 'flightnumber' and generate a table*/}

        {/* Display the passenger list table or error message */}
        {errorMessage ? (<p>{errorMessage}</p>):(

          <div classname = 'w-20 bg-white rounded p-3'>
            <table className='table'>
                <thead>
                <tr>
                <th>TicketID</th>
                <th>Name</th>
                <th>Email</th>
                <th>FlightID</th>
                <th>PaymentID</th>
                <th>SeatID</th>
                </tr>                    
                </thead>
                <tbody>
                {
                    passengerList.map((data,i)=> (
                        <tr key= {i}> 
                            <td>{data.TicketID} </td>
                            <td>{data.Name} </td>
                            <td>{data.Email} </td>
                            <td>{data.FlightID} </td>
                            <td>{data.PaymentID} </td>
                            <td>{data.SeatID} </td>
                        </tr> 
                    ))
                } 
                </tbody> 
            </table>
          </div>
        )}
      </div>
    );
}

export default BrowsePassengerList;
