// Flights.js
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Flights.css';



const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const isFlightOnDay = (day) => {
  // Placeholder logic, replace with real flight data logic
  // For example, if your flight is on a Tuesday:
  return day === "Tuesday";
};

function formatDate(date) {
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function getWeekDates(selectedDate) {
  const date = new Date(selectedDate);
  const weekDates = [];

  // Setting the first day of the week (Sunday)
  date.setDate(date.getDate() - date.getDay());

  for (let i = 0; i < 7; i++) {
    weekDates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return weekDates;
}

function Flights() {

    const[flights, setFlights] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { from, to, departureDate, guests } = location.state || {}; // Make sure 'guests' is destructured here
  
    useEffect(() => {
      axios.post('http://localhost:8081/Flights', {from, to , departureDate})
      .then(res => {
        console.log(res);
        setFlights(res.data);
  }).catch(err => console.log(err));

  }, [from, to, departureDate]);

    const handleSeatSelectClick = () => {
        navigate('/seat-select');
    };

    const weekDates = getWeekDates(departureDate);

    return (
      <div>
        <h1>Flights</h1>
        <p>Showing flights from {from || 'your departure city '} to {to || 'your destination '} 
         {' on the week of '}{departureDate || 'selected date'} for {guests || 'number of'} guests.</p>

        <div className="week-container">
          {weekDates.map((date) => (
            <div key={date.toISOString()} className="day-box">
              <p className="day-name">{formatDate(date)}</p> {/* Only this part will be bold */}
              {isFlightOnDay(weekDays[date.getDay()]) && <p>FLIGHT</p>} {/* This will remain normal weight */}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center">
                <table className='w-50 table table-bordered table-striped'>
                   <thead>
                    <tr>
                    <th>FlightNumber</th>
                    {/*<th>from</th>
                    <th>to</th>
                    <th>Date</th>*/}
                    <th>Price CAD$</th>
                    </tr>                    
                   </thead>
                   <tbody>
                    {
                        flights.map((data,i)=> (
                            <tr key= {i}> 
                                <td>{data.FlightID} </td>
                                {/*<td>{data.Origin} </td>
                                <td>{data.Destination} </td>
                                <td>{data.DestinationDate} </td>*/}
                                <td>{data.Price} </td>
                                
                            </tr> 
                        ))
                    } 
                   </tbody> 
                </table>
          </div>
        <button onClick={handleSeatSelectClick}>Proceed to Seat Selection</button> 
      </div>
    );
  }

export default Flights;
