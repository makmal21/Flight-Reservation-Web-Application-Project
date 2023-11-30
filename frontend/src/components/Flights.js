// Flights.js
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Flights.css';
import moment from 'moment'; //new library for formating date



function Flights() {

    const[flights, setFlights] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { from, to } = location.state || {}; // Make sure 'guests' is destructured here
  
    useEffect(() => {
      axios.post('http://localhost:8081/Flights', {from, to })
      .then(res => {
        console.log(res);
        setFlights(res.data);
  }).catch(err => console.log(err));

  }, [from, to]);

    const handleSeatSelectClick = () => {
        navigate('/seat-select');
    };



    return (
      <div>
        <h1>Flights</h1>
        <p>Showing flights from {from || 'your departure city '} to {to || 'your destination: '} </p>

        <div className="d-flex justify-content-center align-items-center">
                <table className='w-50 table table-bordered table-striped'>
                   <thead>
                    <tr>
                    <th>FlightNumber</th>
                    {/*<th>from</th>
                    <th>to</th>
                    <th>Date</th>*/}
                    <th>Departure Date</th>
                    <th>Price CAD$</th>
                    </tr>                    
                   </thead>
                   <tbody>
                    {
                        flights.map((data,i)=> (
                            <tr key= {i}> 
                                <td>{data.FlightID} </td>
                                <td>{data.Origin} </td>
                                <td>{data.Destination} </td>*
                                <td>{moment(data.DepartureDate).format('YYYY-MM-DD HH:mm:ss')} </td>
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
