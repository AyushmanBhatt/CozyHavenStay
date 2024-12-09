import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios'; // Import Axios for API calls

import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    hotels: 0,
    bookings: 0,
    newBookingsToday: 0,
  });

  useEffect(() => {
    
    const fetchStats = async () => {
      try {
        
        const token = localStorage.getItem('jwtToken'); 

        
        const response = await axios.get('http://localhost:8080/api/bookings/stats', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setStats(response.data); 
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  
  const pieData = {
    labels: ['Users', 'Hotels', 'Bookings'],
    datasets: [
      {
        label: 'Overview',
        data: [stats.users, stats.hotels, stats.bookings],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="sidebar">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/hotels">Hotels</Link></li>
            <li><Link to="/admin/bookings">Bookings</Link></li>
            <li><Link to="/admin/reviews">Reviews</Link></li>
          </ul>
        </div>
        <div className="dashboard-content">
          <h1>Welcome to the Admin Dashboard</h1>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{stats.users}</p>
            </div>
            <div className="stat-card">
              <h3>Total Hotels</h3>
              <p>{stats.hotels}</p>
            </div>
            <div className="stat-card">
              <h3>Total Bookings</h3>
              <p>{stats.bookings}</p>
            </div>
            <div className="stat-card">
              <h3>New Bookings Today</h3>
              <p>{stats.newBookingsToday}</p>
            </div>
          </div>

          <div className="dashboard-charts">
            <div className="chart-container">
              <h2>Overview</h2>
              <Pie data={pieData} />
            </div>
           
          </div>

          <div className="dashboard-summary">
            <h2>Quick Overview</h2>
            <p>Manage users, hotels, and bookings through the navigation menu on the left.</p>
            <p>Click on any section to access detailed management features.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
