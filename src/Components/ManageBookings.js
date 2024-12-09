import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageBookings.css';
import { Link } from 'react-router-dom';

const ManageBookings = () => {
  const [ownerId, setOwnerId] = useState(null); // To store the logged-in owner's ID
  const [hotels, setHotels] = useState([]); // List of hotels for the owner
  const [selectedHotelId, setSelectedHotelId] = useState(null); // Selected hotel ID
  const [bookings, setBookings] = useState([]); // Bookings for the selected hotel
  const [message, setMessage] = useState(''); // Success or error messages

  // Fetch the owner ID from the backend
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

  // Fetch hotels for the logged-in owner
  useEffect(() => {
    if (!ownerId) return; // Wait until ownerId is fetched
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/api/hotels/gethotelbyownerid/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotels(response.data); // Set hotels fetched for the owner
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [ownerId]); // Re-run this when ownerId is fetched

  // Fetch bookings for the selected hotel
  const fetchBookings = async (hotelId) => {
    setSelectedHotelId(hotelId); // Set the selected hotel
    setBookings([]); // Clear previous bookings
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`http://localhost:8080/api/bookings/getbookingbyhotelid/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data); // Set bookings for the selected hotel
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Delete a booking
  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://localhost:8080/api/deletebookingbyid/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId)); // Remove deleted booking from the list
      setMessage('Booking deleted successfully!'); // Success message
    } catch (error) {
      console.error('Error deleting booking:', error);
      setMessage('Failed to delete booking.'); // Error message
    }
  };

  return (<>
  <div className="sidebar">
          <ul>
            <li><Link to="/hotelowner/dashboard">Dashboard</Link></li>
            <li><Link to="/hotelowner/hotels">Hotels</Link></li>
            <li><Link to="/hotelowner/bookings">Bookings</Link></li>
            <li><Link to="/hotelowner/rooms">Rooms</Link></li>
            <li><Link to="/hotelowner/reviews">Reviews</Link></li>
          </ul>
        </div>
    <div className="manage-bookings">
      
      <h1>Manage Bookings</h1>
      {message && <p className="message">{message}</p>}

      {/* Hotel Selection */}
      <div className="hotel-selector">
        <h2>Select a Hotel</h2>
        <div className="hotel-cards">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={`hotel-card2 ${selectedHotelId === hotel.id ? 'active' : ''}`}
              onClick={() => fetchBookings(hotel.id)} // Fetch bookings when a hotel is clicked
            >
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Section */}
      {selectedHotelId ? (
        <div className="bookings-section">
          <h2>Bookings for Selected Hotel</h2>
          {bookings.length === 0 ? (
            <p>No bookings available for this hotel.</p>
          ) : (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Contact Number</th>
                  <th>Room Id</th>
                  <th>Check-In Date</th>
                  <th>Check-Out Date</th>
                  <th>Booking Date</th>
                  <th>TotalBill</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.phoneNo}</td>
                    <td>{booking.roomId}</td>
                    <td>{new Date(booking.arrivalDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.departureDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>{booking.totalBill}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteBooking(booking.id)} // Call delete booking handler
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <p>Please select a hotel to view its bookings.</p>
      )}
    </div>
    </>
  );
};

export default ManageBookings;
