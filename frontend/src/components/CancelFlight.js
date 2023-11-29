import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CancelFlight() {
    const[email, setEmail] = useState('')
    const[bookingID, setBookingID] = useState('')
    const [Ticket, setTicket] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/cancel-flight', {bookingID})
      .then(res => {
        console.log(res);
        if(res.data.length === 0){
          setErrorMessage('Incorrect BookingNumber. Please try again.');
        }else {
          setTicket(res.data);
        }
      }).catch(err => console.log(err));

    };

    const handleDelete = async (id) => {
      console.log(id)
      if(window.confirm('Are you sure you want to cancel the flight with Booking ID '+id+'?'))
      {
        try {
          await axios.delete('http://localhost:8081/cancel-flight/'+id)
          toast.success('Flight Deleted Successfully!'); 
          window.location.reload()
          toast.success('Flight Deleted Successfully!'); // this doesn't work? - i think need to render in the backend
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
              </div>
            </div>
            <p style={{ fontSize: '12px', color:'white' }}><b>Flights are not refundable.</b></p>
            <div className='d-flex justify-content-center align-items-center'>
                {errorMessage ? (<p>{errorMessage}</p>):(
                <div classname = 'w-25 bg-white rounded p-3'>
                  <h>Ticket Information</h>
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
    </div>
    
    )

}

export default CancelFlight;

