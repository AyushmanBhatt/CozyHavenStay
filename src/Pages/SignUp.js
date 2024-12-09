import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('USER');  
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple form validation
        if (!name || !email || !password || !confirmPassword || !role || !username) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        
            console.log("Signup Initiated");
            const user = {
                name,
                username,
                email,
                password,
                role
            }
            console.log("Payload to API: ",user);

            axios.post('http://localhost:8080/api/users/register',user)
            .then((response)=>{
                setSuccess("Registration successful ! Redirecting to Sign In...");
                setTimeout(()=>{
                    navigate('/signin');
                },2000);
            })
            .catch((error)=>{
                setError(error.response ? error.response.data.message : "An error occurred.");
            });
        



        
        
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        placeholder="Enter full name" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        placeholder="Enter email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="username" 
                                        placeholder="Enter Username" 
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
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="confirmPassword" 
                                        placeholder="Confirm password" 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Select Role</label>
                                    <select 
                                        id="role" 
                                        className="form-control" 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value.toUpperCase())} 
                                        required
                                    >
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="HOTEL_OWNER">HOTEL_OWNER</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            </form>
                            <div className="mt-3">
                                <p>Already have an account? <a href="/signin">Sign in here</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
