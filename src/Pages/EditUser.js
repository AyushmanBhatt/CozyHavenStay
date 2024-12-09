import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css';

const EditUser = () => {
  const { id } = useParams();  // Get the user id from the URL
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let token = localStorage.getItem("jwtToken");
        const response = await axios.get(`http://localhost:8080/api/users/getuser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const userData = response.data;
        setUsername(userData.username);
        setPassword(userData.password);
        setName(userData.name);
        setEmail(userData.email);
        setRole(userData.role);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { username, password, name, email, role };

    try {
      let token = localStorage.getItem("jwtToken");
      // Make an API call to update the user
      const response = await axios.put(`http://localhost:8080/api/users/updateuser/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Updated User:', response.data);
      navigate('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="add-user">
      <h1>Edit User</h1>
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
            <option value="User">User</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
