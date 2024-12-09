import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!username || !password) {
            setError("Both fields are required.");
            return;
        }

        try{
            const response = await axios.post('http://localhost:8080/auth/login',{
                username,password
            });

            const {role,token} = response.data;
            localStorage.setItem('jwtToken',token);
            localStorage.setItem('role',role);

            setError('');
            setSuccess("Login successful! Redirecting...");

            setTimeout(()=>{
                if (role === "ROLE_ADMIN"){
                    navigate('/admin/dashboard');
                    window.location.reload(); 
                } else if (role === 'ROLE_HOTEL_OWNER') {
                    navigate('/hotelowner/dashboard');
                    window.location.reload(); 
                } else {
                    navigate('/');
                    window.location.reload(); 
                }
            },2000);
        } catch(err){
            setError("Invalid username or password.");
        }
    };


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="username" 
                                        placeholder="Enter username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        placeholder="Enter password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </form>
                            <div className="mt-3">
                                <p>Don't have an account? <a href="/signup">Sign up here</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
