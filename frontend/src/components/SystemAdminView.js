// SystemAdminView.js

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../Admin.css';

//TO DO : UPADTE IS ONLY NEEDED FOR FLIGHT TABLE 
//FOR CREW AND AIRCRAFT ONLY ADDING AND REMOVING 


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
    console.log(id)
    if(window.confirm('Are you sure you want to remove this crew member with '+id+'?'))
    {
      try{
        await axios.delete('http://localhost:8081/system-admin-view/'+id)
        window.location.reload()
      }catch(err){
        console.log(err);
      }
    }

}
  return (
    <div>
        <h2>System Administrator Portal</h2>
        <div className= 'd-flex vh-100 justify-content-right align-items-center'>
          <div className="table-container">
          <Link to="/system-admin-view/add" className='btn btn-success'>Add Crew +</Link>
            <table className='scrollable-table w-100 bg-white rounded p-3'>
                    <thead>
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
                                      <Link to={`update/${data.CrewID}`} className='btn btn-primary'>Update</Link>
                                      <button className='btn btn-danger ms-2' onClick={e =>handleDelete(data.CrewID)}>Delete</button>
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