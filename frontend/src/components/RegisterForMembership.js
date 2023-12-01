// RegisterForMembership.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react'; // Import useState
import Validation from './LoginValidation.js';
import axios from 'axios';

function RegisterForMembership() {
    // const navigate = useNavigate();

    const [registrationData, setRegistrationData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const handleInputChange = (event) => {
        setRegistrationData(prevData => ({...prevData,[event.target.name]: event.target.value}));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the registration logic here. Send data to server, etc.
        setErrors(Validation(registrationData))
        console.log(registrationData)
        if(errors.firstName === "" && errors.lastName === "" && errors.email === "" && errors.password === ""){
            console.log(registrationData)
            axios.post('http://localhost:8081/register', registrationData)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    };    

return (
    <div>
        
        <div className="form-wrapper-2">
            <div className="booking-form-container">
            <h2>Become a member today!</h2>
            <p style={{ textAlign: 'left' }}><b>Perks include:</b><br/ >
            <br />
            • Eligibility to apply for the company's credit card<br />
            • Monthly promotion news<br />  
            • Discount prices at airport lounges<br />
            • One free companion ticket once a year</p>      


            <form onSubmit={handleSubmit}> 
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    onChange={handleInputChange} 
                    value={registrationData.firstName} 
                />
                {errors.firstName && <span className='text-danger'> {errors.firstName}</span>}

                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    onChange={handleInputChange} 
                    value={registrationData.lastName} 
                />
                {errors.lastName && <span className='text-danger'> {errors.lastName}</span>}

                <label htmlFor="email">Email Address</label>
                <input 
                    type="email"  // Changed to type="email" for proper validation
                    id="email" 
                    name="email" 
                    onChange={handleInputChange} 
                    value={registrationData.email}
                />
                {errors.email && <span className='text-danger'> {errors.email}</span>}

                <label htmlFor="password">Password</label>
                <input 
                    type="password"  // Added type="password" here
                    id="password" 
                    name="password" 
                    onChange={handleInputChange} 
                    value={registrationData.password}
                />
                {errors.password && <span className='text-danger'> {errors.password}</span>}

                <button type="submit">Apply for Membership</button>
            </form>
            </div>
        </div>
    </div>
);

}

export default RegisterForMembership;
