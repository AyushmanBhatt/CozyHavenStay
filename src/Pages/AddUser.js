import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { username, password, name, email, role };

    
    let token = localStorage.getItem("jwtToken"); 
    axios.post("http://localhost:8080/api/users/register", newUser, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': "application/json"  
      },
    })
      .then((response) => {
        console.log('New User Added:', response.data);
        navigate('/admin/users');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div className="add-user">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="HOTEL_OWNER">Hotel Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
