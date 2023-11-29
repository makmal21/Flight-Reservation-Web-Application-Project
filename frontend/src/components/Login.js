import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Login() {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    function handleSubmit(event){
        event.preventDefault();
    }
    return(
    <div>
        <h2>Login</h2>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit = {handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type = "email" placeholder = 'Enter Email' className='form-control'
                        onChange={e=>setEmail(e.target.value)}/>                            
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type = "password" placeholder = 'Enter Password' className='form-control'
                        onChange={e=>setPassword(e.target.value)}/>                            
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    </div>
    
    )
}

export default Login;