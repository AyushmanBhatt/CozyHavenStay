import React, { useState, useEffect } from 'react';
import './BookingManagement.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings/allbookings', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load bookings');
        setLoading(false);
      });
  }, [token]);

  

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="booking-management">
      <div className="sidebar">
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/hotels">Hotels</Link></li>
          <li><Link to="/admin/bookings">Bookings</Link></li>
          <li><Link to="/admin/reviews">Reviews</Link></li>
        </ul>
      </div>
      <h1>Manage Bookings</h1>
      {bookings.length > 0 ? (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>No. of Rooms</th>
              <th>Adults</th>
              <th>Children</th>
              <th>Arrival Date</th>
              <th>Departure Date</th> 
              <th>Hotel</th>
              <th>Room</th>
              <th>Room Type</th>
              <th>Total Bill</th>
              
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phoneNo}</td>
                <td>{booking.noOfRooms}</td>
                <td>{booking.noOfAdults}</td>
                <td>{booking.noOfChildren}</td>
                <td>{booking.arrivalDate}</td>
                <td>{booking.departureDate}</td>
                <td>{booking.hotelId}</td>
                <td>{booking.roomId}</td>
                <td>{booking.roomType}</td>
                <td>{`₹${booking.totalBill}`}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingManagement;
