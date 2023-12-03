import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CancelFlight() {
    const[email, setEmail] = useState('')
    const[bookingID, setBookingID] = useState('')
    const [Ticket, setTicket] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [showTicketInfo, setShowTicketInfo] = useState(false); // State to control display of ticket info


    const handleSubmit = (event) => {
      event.preventDefault();
      setShowTicketInfo(false); // Hide ticket info on new search
      setErrorMessage(''); // Clear any existing error messages
      axios.post('http://localhost:8081/cancel-flight', { bookingID })
      .then(res => {
        console.log(res);
        if(res.data.length === 0){
          setErrorMessage('Incorrect email or bookingID.'); // Set error message for no results
          setShowTicketInfo(false); // Keep ticket info hidden
        }else {
          setTicket(res.data);
          setShowTicketInfo(true); // Show ticket info on successful search
        }
      }).catch(err => {
        console.error(err);
        setErrorMessage('An error occurred while searching for the flight.'); // Set error message for an error
        setShowTicketInfo(false); // Ensure ticket info is hidden on error
      });
    };

    const handleDelete = async (id) => {
      console.log(id)
      if(window.confirm('Are you sure you want to cancel the flight with Booking ID '+id+'?'))
      {
        try {
          await axios.delete('http://localhost:8081/cancel-flight/'+id)
          toast.success('Flight Cancelled Successfully and Email Sent!');
          
          setTimeout(()=>{
            window.location.reload()
          }, 3000)
          
        } catch (error) {
            console.log(error);
        }
      }
 
  }; 
       
    return(
    <div>
        <h2>Plans changed?</h2>
        <p> Enter your email and secure booking ID that was sent to your email to cancel your flight. </p>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type = "text" placeholder = 'Enter Email' className='form-control'
                        onChange={e=>setEmail(e.target.value)}/>                            
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="bookingID">Booking ID</label>
                        <input type = "text" placeholder = 'Enter Booking ID' className='form-control'
                        onChange={e=>setBookingID(e.target.value)}/>                            
                    </div>
                    <button className='btn btn-success' type ="submit">Search flight to Cancel</button>
                </form>


                {/* Display the Ticket information or error message */}
                {/* Conditionally render the ticket information */}

              </div>
            </div>
            <p style={{ fontSize: '12px', color:'white' }}><b>Flights are not refundable.</b></p>
            
              {/* This will show the error message if it exists */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            {showTicketInfo && (
              <div className='d-flex justify-content-center align-items-center'>
                  {errorMessage ? (<p>{errorMessage}</p>):(
                  <div classname = 'w-25 bg-white rounded p-3'>
                    <h><b>Ticket Information</b></h>
                    <table className='table'>
                        <thead>
                        <tr>
                        <th>Booking ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>FlightID</th>
                        <th>Action</th>
                        </tr>                    
                        </thead>
                        <tbody>
                        {
                            Ticket.map((data,i)=> (
                                <tr key= {i}> 
                                    <td>{data.TicketID} </td>
                                    <td>{data.Name} </td>
                                    <td>{data.Email} </td>
                                    <td>{data.FlightID} </td>
                                    <td>                   
                                      <button className='btn btn-danger ms-2' onClick={e =>handleDelete(data.TicketID)}>Delete</button>
                                    </td>
                                </tr> 
                            ))
                        } 
                        </tbody> 
                    </table>
                  </div>
                  )}
            </div>
            )}
         <ToastContainer />   
    </div>
    
    )

}

export default CancelFlight;

