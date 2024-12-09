import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import './HotelOwnerDashboard.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const HotelOwnerDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    activeBookings: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const fetchOwnerId = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/auth/getOwnerId', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOwnerId(response.data); // Assuming API returns an `ownerId`
      } catch (error) {
        console.error('Error fetching owner ID:', error);
      }
    };

    fetchOwnerId();
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    if (!ownerId) return; // Prevent API call if ownerId is not yet available
  
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/api/owner/stats`, {
          params: {
            ownerId: ownerId, // Pass ownerId as a query parameter
          }, 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchStats();
  }, [ownerId]);

  // Chart Data
  const pieData = {
    labels: ['Total Rooms', 'Active Bookings', 'Reviews'],
    datasets: [
      {
        label: 'Overview',
        data: [stats.totalRooms, stats.activeBookings, stats.reviews],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: ['Bookings'],
    datasets: [
      {
        label: 'Bookings Overview',
        data: [stats.totalBookings],
        backgroundColor: ['#42A5F5'],
        hoverBackgroundColor: ['#64B5F6'],
      },
    ],
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="hotel-owner-dashboard">
      <div className="dashboard-container">
        <aside className="sidebar">
          <ul>
            <li><Link to="/hotelowner/dashboard">Dashboard</Link></li>
            <li><Link to="/hotelowner/hotels">Hotel</Link></li>
            <li><Link to="/hotelowner/bookings">Bookings</Link></li>
            <li><Link to="/hotelowner/rooms">Rooms</Link></li>
            <li><Link to="/hotelowner/reviews">Reviews</Link></li>
          </ul>
        </aside>

        <main className="dashboard-content">
          <h1>Welcome to the Hotel Owner Dashboard</h1>

          <section className="dashboard-stats">
            <StatCard title="Total Rooms" value={stats.totalRooms} />
            <StatCard title="Total Bookings" value={stats.totalBookings} />
            <StatCard title="Active Bookings" value={stats.activeBookings} />
            <StatCard title="Total Reviews" value={stats.reviews} />
          </section>

          <section className="dashboard-charts">
            <ChartContainer title="Overview">
              <Pie data={pieData} />
            </ChartContainer>
            <ChartContainer title="Bookings Overview">
              <Bar data={barData} />
            </ChartContainer>
          </section>

          <section className="dashboard-summary">
            <h2>Quick Overview</h2>
            <p>Manage your hotel, bookings, rooms, and reviews through the navigation menu on the left.</p>
            <p>Click on any section to access detailed management features.</p>
          </section>
        </main>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

// Reusable Chart Container Component
const ChartContainer = ({ title, children }) => (
  <div className="chart-container">
    <h2>{title}</h2>
    {children}
  </div>
);

export default HotelOwnerDashboard;
