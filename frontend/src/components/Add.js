import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add (){
    const [crewID, setCrewID] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [flightID, setFlightID] = useState('')
    const navigate = useNavigate();

    //Insert into database api request
    function handleSubmit(event){
        event.preventDefault();
        
        axios.post('http://localhost:8081/system-admin-view/add', {crewID, name, role, flightID})
        .then(res => {
            console.log(res);
            navigate('/system-admin-view'); 
        }).catch(err => console.log(err));
    }

    return(
        <div className= 'd-flex vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3' >
            <form onSubmit={handleSubmit}>
                <h2>Add Crew</h2>
                <div className= 'mb-2'>
                    <label htmlFor="" >CrewID</label>
                    <input type="text" placeholder= 'Enter CrewID' className= 'form-control' 
                    onChange={e => setCrewID(e.target.value)}/>
                </div>
                <div className= 'mb-2'>
                    <label htmlFor="" >Name</label>
                    <input type="text" placeholder= 'Enter Name' className= 'form-control' 
                    onChange={e => setName(e.target.value)}/>
                </div>
                <div className ='mb-2'>
                    <label htmlFor="">Role</label>
                    <input type="text" placeholder='Enter Role' className='form-control'
                    onChange={e => setRole(e.target.value)}/>
                </div>
                <div className ='mb-2'>
                    <label htmlFor="">FlightID</label>
                    <input type="text" placeholder='Enter FlightID' className='form-control'
                    onChange={e => setFlightID(e.target.value)}/>
                </div>
                <button className='btn btn-success' type='submit'>Submit</button>
            </form>
        </div>
    </div> 
    )
}

export default Add