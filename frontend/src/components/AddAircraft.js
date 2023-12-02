import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAircraft (){
    const [aircraftID, setAircraftID] = useState('')
    const [model, setModel] = useState('')
    const [capacity, setCapacity] = useState('')
    const [flightID, setFlightID] = useState('')
    const navigate = useNavigate();

    //Insert into database api request
    function handleSubmit(event){
        event.preventDefault();
        
        axios.post('http://localhost:8081/system-admin-view/aircraft/add', {aircraftID, model, capacity, flightID})
        .then(res => {
            console.log(res);
            navigate('/system-admin-view/aircraft'); 
        }).catch(err => console.log(err));
    }

    return(
        <div className= 'd-flex vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3' >
            <form onSubmit={handleSubmit}>
                <h2>Add Aircraft</h2>
                <div className= 'mb-2'>
                    <label htmlFor="" >AircraftID</label>
                    <input type="text" placeholder= 'Enter AircraftID' className= 'form-control' 
                    onChange={e => setAircraftID(e.target.value)}/>
                </div>
                <div className= 'mb-2'>
                    <label htmlFor="" >Model</label>
                    <input type="text" placeholder= 'Enter Model' className= 'form-control' 
                    onChange={e => setModel(e.target.value)}/>
                </div>
                <div className ='mb-2'>
                    <label htmlFor="">Capacity</label>
                    <input type="number" placeholder='Enter Capacity' className='form-control'
                    onChange={e => setCapacity(e.target.value)}/>
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

export default AddAircraft