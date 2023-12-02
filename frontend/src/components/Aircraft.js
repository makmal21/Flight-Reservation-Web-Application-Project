// Aircraft.js

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../Admin.css';

// delete and add working --> weird that window reload is not working ?

function Aircraft() {

    //Array to store data retrieved from  database
    const[aircraft,setAircraft] = useState([])
  
    //Retrieve Crew Table from Database 
    useEffect(()=>{
      axios.get('http://localhost:8081/system-admin-view/aircraft')
      .then(res=> setAircraft(res.data))
      .catch(err => console.log(err));
    },[])
  
  
    //Send request to remove crew 
    const handleDelete = async (id) => {
      console.log(id)
      if(window.confirm('Are you sure you want to remove this '+id+'?'))
      {
        try{
          await axios.delete('http://localhost:8081/system-admin-view/aircraft'+id)
          window.location.reload()
        }catch(err){
          console.log(err);
        }
      } 
  }
    return (
      <div>
          <h2>System Administrator Portal</h2>
          <div className= 'd-flex justify-content-center align-items-center'>
            <div className="table-container">
            <Link to="/system-admin-view/aircraft/add" className='btn btn-success'>Add Aircraft +</Link>
              <table className='scrollable-table w-100 bg-white rounded p-3'>
                      <thead>
                        <tr>
                        <th>AircraftID</th>
                        <th>Model</th>
                        <th>Capacity</th>
                        <th>FlightID</th>
                        <th>Action</th>
                        </tr>                    
                      </thead>
                      <tbody>
                        {
                            aircraft.map((data,i)=> (
                                <tr key= {i}> 
                                    <td>{data.AircraftID} </td>
                                    <td>{data.Model} </td>
                                    <td>{data.Capacity} </td>
                                    <td>{data.FlightID} </td>
                                    <td>
                                        <button className='btn btn-danger ms-2' onClick={e =>handleDelete(data.AircraftID)}>Delete</button>
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
  
  export default Aircraft;