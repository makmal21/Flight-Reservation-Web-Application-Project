//UpdateFlight.js
import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';

function Update (){
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [price, setPrice] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();

    //once form has been submitted that is - information filled 
    // then we send the data to the backend
    //return to system admin page '/system-admin-view'
    function handleSubmit(event){
        event.preventDefault();
        axios.put(`http://localhost:8081/system-admin-view/adminFlight/update/`+id, {id, origin, destination, departureDate, price})
        .then(res => {
            console.log(res);
            navigate('/system-admin-view/adminFlight'); 
        }).catch(err => console.log(err));
    }

    return(
        <div className= 'd-flex vh-50 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3' >
            <form onSubmit={handleSubmit}>
                <h2>Update Flight information for flightID {id}</h2>
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
                    <input type="datetime-local" placeholder='Enter Depature Date' className='form-control'
                    onChange={e => setDepartureDate(e.target.value)}/>
                </div>
                <div className ='mb-2'>
                    <label htmlFor="">Price</label>
                    <input type="number" placeholder='Enter Price' className='form-control'
                    onChange={e => setPrice(e.target.value)} step="any" min ={0} />
                </div>
                <button className='btn btn-success'type='submit'>Update</button>
            </form>
        </div>
    </div> 
    )
}

export default Update