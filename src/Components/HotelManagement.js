import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HotelManagement.css';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwtToken"); 

  
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelResponse = await axios.get("http://localhost:8080/api/hotels/getallhotel", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setHotels(hotelResponse.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []); 

  // Handle delete operation (replace with actual API call if needed)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/deletehotel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token for authentication
        }
      });
      setHotels(hotels.filter((hotel) => hotel.id !== id)); // Update the UI after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="hotel-management">
      <div className="sidebar">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/hotels">Hotels</Link></li>
            <li><Link to="/admin/bookings">Bookings</Link></li>
            <li><Link to="/admin/reviews">Reviews</Link></li>
          </ul>
        </div>
      <h1>Hotel Management</h1>
      <div className="hotel-actions">
        <Link to="/admin/hotels/addhotel" className="add-hotel-btn">
          Add Hotel
        </Link>
      </div>
      <table className="hotel-table">
        <thead>
          <tr>
            <th>Hotel ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Hotel Owner</th>
            <th>Phone Number</th>
            <th>Description</th>
            <th>Special Feature</th>
            <th>Amenities</th>
            <th>Rooms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>{hotel.owner.user.name}</td>
              <td>{hotel.phoneNo}</td>
              <td>{hotel.description}</td>
              <td>{hotel.specialFeature}</td>
              <td>{hotel.amenities.join(', ')}</td>
              <td>
                <table className="room-table">
                  <thead>
                    <tr>
                      <th>Room Type</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotel.rooms.map((room) => (
                      <tr key={room.id}>
                        <td>{room.roomType}</td>
                        <td>{`$${room.baseFare}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                <Link to={`/admin/hotels/updatehotel/${hotel.id}`} className="edit-btn">
                  Edit
                </Link>
                <button onClick={() => handleDelete(hotel.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelManagement;
