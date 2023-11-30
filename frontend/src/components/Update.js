import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';

// UPDATE THE FLIGHTID ? TO MATCH WHICH FLIGHT THEY WORK ON NEXT?//

function Update (){
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [flightID, setFlightID] = useState('')
    const {id} = useParams(); // using parameters key ID from table since we are updating values so need to know what row
    const navigate = useNavigate();

    //once form has been submitted that is - information filled 
    // then we send the data to the backend
    //return to system admin page '/system-admin-view'
    function handleSubmit(event){
        event.preventDefault();
        axios.put(`http://localhost:8081/update/`+id, {id, name, role, flightID})
        .then(res => {
            console.log(res);
            navigate('/system-admin-view'); 
        }).catch(err => console.log(err));
    }

    return(
        <div className= 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3' >
            <form onSubmit={handleSubmit}>
                <h2>Update Crew</h2>
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
                <button className='btn btn-success'type='submit'>Update</button>
            </form>
        </div>
    </div> 
    )
}

export default Update