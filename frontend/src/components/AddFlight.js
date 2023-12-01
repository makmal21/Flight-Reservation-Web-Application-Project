//AddFlight.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddFlight (){
    const [flightID, setFlightID] = useState('')
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [price, setPrice] = useState('')
    const navigate = useNavigate();

    //Insert into database api request
    function handleSubmit(event){
        event.preventDefault();
        
        axios.post('http://localhost:8081/system-admin-view/adminFlight/add', {flightID, origin, destination, departureDate, price})
        .then(res => {
            console.log(res);
            navigate('/system-admin-view/adminFlight'); 
        }).catch(err => console.log(err));
    }

    return(
        <div className= 'd-flex vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3' >
            <form onSubmit={handleSubmit}>
                <h2>Add Flight</h2>
                <div className= 'mb-2'>
                    <label htmlFor="" >FlightID</label>
                    <input type="text" placeholder= 'Enter FlightID' className= 'form-control' 
                    onChange={e => setFlightID(e.target.value)}/>
                </div>
                <div className= 'mb-2'>
                    <label htmlFor="" >Origin</label>
                    <input type="text" placeholder= 'Enter Origin' className= 'form-control' 
                    onChange={e => setOrigin(e.target.value)}/>
                </div>
                <div className ='mb-2'>
                    <label htmlFor="">Destination</label>
                    <input type="text" placeholder='Enter Destination' className='form-control'
                    onChange={e => setDestination(e.target.value)}/>
                </div>
                <div className ='mb-2'>
                    <label htmlFor="">DepartureDate</label>
                    <input type="datetime-local" placeholder='Enter Departure Date' className='form-control'
                    onChange={e => setDepartureDate(e.target.value)}/>
                </div>
                <div className ='mb-2'>
                    <label htmlFor="">Price</label>
                    <input type="number" placeholder='Enter Price' className='form-control'
                    onChange={e => setPrice(e.target.value)} step="any" min ={0} />
                </div>
                <button className='btn btn-success' type='submit'>Submit</button>
            </form>
        </div>
    </div> 
    )
}

export default AddFlight