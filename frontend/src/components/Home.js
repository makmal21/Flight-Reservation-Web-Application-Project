import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useQuery } from 'react-query';
import '../App.css';
import axios from 'axios';



function Home() {

    //EXPRESS JS TEST STUFF: UNCOMMENT FOR TESTING PROXY
    // const fetchMyData = async () => {
    //     const response = await fetch('http://localhost:3010/my-endpoint');
    //     if (!response.ok) {
    //       throw new Error('Network response was NOT ok');
    //     }
    //     return response.json();
    //   };
    // const {data, error, isLoading } = useQuery('home-page', fetchMyData);

  
    const navigate = useNavigate();
    // Use only formData state to manage all form fields
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        guests: '1',
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }));
    };
    
   // Use formData for navigation state
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/flights', { state: formData })
    }; 

    //EXPRESS JS TEST STUFF: UNCOMMENT FOR TESTING PROXY
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>An error has occurred: {error.message}</div>;
    // console.log(data)


    const locationOptions = ["Calgary", "Toronto", "Vancouver", 
    "Montreal", "Edmonton", "Ottawa", "Winnipeg", "Halifax"];

    return (
        <div>
        <div className="form-wrapper-2"> {/* This is a new wrapper div for centering the form */}
            <div className="booking-form-container">
            <h2>Welcome to 614 Airlines!</h2>
            <p>Please fill in flight details below.</p>         

            <form onSubmit={handleSubmit}> 
                <label htmlFor="trip-type">Trip type</label>
                <select id="trip-type" name="trip-type">
                    <option value="one-way">One way</option>
                    <option value="round-trip">Round trip</option>
                </select>

                <label htmlFor="from">From</label>
                <select id="from" name="from" onChange={handleInputChange} value={formData.from}>
                    <option value="" disabled>Select departure city</option>
                    {locationOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                         </option>
                    ))}
                </select>

                <label htmlFor="to">Going to</label>
                <select id="to" name="to" onChange={handleInputChange} value={formData.to}>
                    <option value="" disabled>Select arrival city</option>
                    {locationOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                         </option>
                    ))}
                </select>

                <label htmlFor="departure-date">Departure date</label>
                <input type="date" id="departure-date" name="departureDate" onChange={handleInputChange} value={formData.departureDate}/>

                <button className="flight-search-button" // Add a specific class name
                type="submit"
                disabled={!formData.from || !formData.to || !formData.departureDate || formData.from===formData.to} >
                Get Flights
                </button>
            </form>
            </div>
        </div>
        </div>
    );


}

export default Home;
