import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useQuery } from 'react-query';
import '../App.css';
import axios from 'axios';



function Home() {


  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        guests: '1',
    });

    const [locationsFrom, setLocationsFrom] = useState([]);
    const [locationsTo, setLocationsTo] = useState([]);
    
    // useEffect(() => {
    //     const fetchLocations = async () => {
    //         try {
    //             const responseFrom = await axios.get('/api/flights/origin');
    //             setLocationsFrom(responseFrom.data);
    
    //             const responseTo = await axios.get('/api/flights/destinations');
    //             setLocationsTo(responseTo.data);
    //         } catch (error) {
    //             console.error("Error fetching locations:", error);
    //         }
    //     };
    
    //     fetchLocations();
    // }, []);

    // This useEffect hook remains mostly the same, it fetches the origins when the component mounts
    useEffect(() => {
        const fetchOrigins = async () => {
            try {
                const responseFrom = await axios.get('/api/flights/origin');
                setLocationsFrom(responseFrom.data);
            } catch (error) {
                console.error("Error fetching origins:", error);
            }
        };

        fetchOrigins();
    }, []); // Empty dependency array to run only on component mount

    // New useEffect hook to fetch destinations based on the selected origin
    useEffect(() => {
        if (formData.from) { // Only fetch destinations if an origin is selected
            const fetchDestinations = async () => {
                try {
                    const responseTo = await axios.get(`/api/flights/destinations/${formData.from}`);
                    setLocationsTo(responseTo.data);
                } catch (error) {
                    console.error("Error fetching destinations for origin:", error);
                }
            };
            fetchDestinations();
        } else {
            setLocationsTo([]); // Reset destinations if no origin is selected
        }
    }, [formData.from]); // Dependency array includes formData.from to trigger the effect when it changes


    
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


    // const locationOptions = ["Calgary", "Toronto", "Vancouver", 
    // "Montreal", "Edmonton", "Ottawa", "Winnipeg", "Halifax"];

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
                </select>

                <label htmlFor="from">From</label>
                <select id="from" name="from" onChange={handleInputChange} value={formData.from}>
                    <option value="" disabled>Select departure city</option>
                    {locationsFrom.map((location, index) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>

                <label htmlFor="to">Going to</label>
                <select id="to" name="to" onChange={handleInputChange} value={formData.to}>
                    <option value="" disabled>Select arrival city</option>
                    {locationsTo.map((location, index) => (
                        <option key={index} value={location}>
                            {location}
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
