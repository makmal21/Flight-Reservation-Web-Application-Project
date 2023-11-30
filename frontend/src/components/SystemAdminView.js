// SystemAdminView.js

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../Admin.css';

function SystemAdminView() {

  //Array to store data retrieved from Crew table in database
  const[crew,setCrew] = useState([])

  //Retrieve Crew Table from Database 
  useEffect(()=>{
    axios.get('http://localhost:8081/system-admin-view')
    .then(res=> setCrew(res.data))
    .catch(err => console.log(err));
  },[])

  const handleDelete = async (id) => {
    try{
        await axios.delete('http://localhost:8081/crew/'+id)
        window.location.reload()
    }catch(err){
        console.log(err);
    }
}
  return (
    <div>
        <h2>System Administrator Portal</h2>
        <p>TO IMPLEMENT: results of SQL queries</p>
        <div className= 'd-flex vh-100 justify-content-center align-items-center'>
          {/*'w-50 bg-white rounded p-3'*/}
          <div className="table-container">
          
            <table className='scrollable-table w-100 bg-white rounded p-3'>
            
                    <thead>
                    <Link to="/add" className='btn btn-success justify-content-right'>Add +</Link>
                      <tr>
                      <th>CrewID</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>FlightID</th>
                      </tr>                    
                    </thead>
                    <tbody>
                      {
                          crew.map((data,i)=> (
                              <tr key= {i}> 
                                  <td>{data.CrewID} </td>
                                  <td>{data.Name} </td>
                                  <td>{data.Role} </td>
                                  <td>{data.FlightID} </td>
                                  <td>
                                      <Link to={`update/${data.FlightID}`} className='btn btn-primary'>Update</Link>
                                      <button className='btn btn-danger ms-2' onClick={e =>handleDelete(data.FligthID)}>Delete</button>
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

export default SystemAdminView;