// src/Components/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserManagement.css';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    

    let token = localStorage.getItem("jwtToken");
    axios.get("http://localhost:8080/api/users/allusers",{
      headers: {
        Authorization: `Bearer ${token}`,        
      }
    })
    .then((res)=>{
      setUsers(res.data);
    })
    .catch((err)=>console.log(err));
    
    
    setLoading(false);
  },[]);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/users/deleteuser/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-management">
      <div className="sidebar">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/hotels">Hotels</Link></li>
            <li><Link to="/admin/bookings">Bookings</Link></li>
            <li><Link to="/admin/reviews">Reviews</Link></li>
          </ul>
        </div>
      <h1>User Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Link to="/admin/users/adduser" className="add-user-btn">Add New User</Link>
          <table className="user-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/admin/users/updateuser/${user.id}`} className="edit-btn">Update</Link>
                    <button onClick={() => deleteUser(user.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
