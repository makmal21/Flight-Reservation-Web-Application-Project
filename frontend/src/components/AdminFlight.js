// Flight.js

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import moment from 'moment';
import '../Admin.css';


function AdminFlight() {

  //Array to store data retrieved from  database
  const[flight,setFlight] = useState([])

  //Retrieve flight Table from Database 
  useEffect(()=>{
    axios.get('http://localhost:8081/system-admin-view/adminflight')
    .then(res=> setFlight(res.data))
    .catch(err => console.log(err));
  },[])


  //Send request to remove crew 
  const handleDelete = async (id) => {
    console.log(id)
    if(window.confirm('Are you sure you want to remove this flight '+id+'?'))
    {
      try{
        await axios.delete('http://localhost:8081/system-admin-view/adminFlight'+id)
        window.location.reload()
      }catch(err){
        console.log(err);
      }
    } 

}
  return (
    <div>
        <h2>Flight Information</h2>
        <div className= 'd-flex justify-content-center align-items-center'>
          <div className="table-container">
          <Link to="/system-admin-view/adminFlight/add" className='btn btn-success'>Add Flight +</Link>
            <table className='scrollable-table w-100 bg-white rounded p-3'>
                    <thead>
                      <tr>
                      <th>FlightID</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Departure Date</th>
                      <th>Price</th>
                      <th>Action</th>
                      </tr>                    
                    </thead>
                    <tbody>
                      {
                          flight.map((data,i)=> (
                              <tr key= {i}> 
                                  <td>{data.FlightID} </td>
                                  <td>{data.Origin} </td>
                                  <td>{data.Destination} </td>
                                  <td>{moment(data.DepartureDate).format('YYYY-MM-DD HH:mm:ss')} </td>
                                  <td>{data.Price} </td>
                                  <td>
                                      <Link to={`/system-admin-view/adminFlight/update/${data.FlightID}`} className='btn btn-primary'>Update</Link>
                                      <button className='btn btn-danger ms-2' onClick={e =>handleDelete(data.FlightID)}>Delete</button>
                                  </td>
                              </tr> 
                          ))
                      } 
                    </tbody> 
                  </table>           
          </div>
        </div>
    </div>
  );
}

export default AdminFlight;