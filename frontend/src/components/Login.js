import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Validation from './LoginValidation.js';
import axios from 'axios';


function Login() {

    const [message, setMessage] = useState('');

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }    

    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(Validation(values))
        if(errors.email === "" && errors.password === ""){
            console.log(values)
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if(res.data.status === 'Success') {
                    if(res.data.data[0].StaffFlag === 0){
                        navigate('/'); 
                    } else if(res.data.data[0].StaffFlag === 1){
                        navigate('/system-admin-view');
                    } else if(res.data.data[0].StaffFlag === 2){
                        navigate('/browse-passenger-list');
                    }
                } else {
                    setMessage('Invalid user');
                }
            })
            .catch(err => console.log(err));
        }
    }

    return(
    <div>
        <h2>Login</h2>
        <div className='d-flex justify-content-center align-items-center p-4'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit = {handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type = "text" name='email' placeholder = 'Enter Email' className='form-control' onChange={handleInput}/> 
                        {errors.email && <span className='text-danger'> {errors.email}</span>}                         
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type = "password" name='password' placeholder = 'Enter Password' className='form-control' onChange={handleInput}/>    
                        {errors.password && <span className='text-danger'> {errors.password}</span>}                       
                    </div>
                    <div className='mb-3'>
                        {message && <div className="text-danger">{message}</div>}
                        <div className='mb-3'>
                            <button type='submit' className='btn btn-success'><strong>Login</strong></button>
                        </div>
                        <div className='mb-3'>
                            <Link to="/register" className='btn btn-success'>Register For Membership</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    )
}

export default Login;