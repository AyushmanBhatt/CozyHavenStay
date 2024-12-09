import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageHotel.css';
import { Link } from 'react-router-dom';

const ManageHotel = () => {
  const [ownerId, setOwnerId] = useState(null); // Owner ID
  const [hotels, setHotels] = useState([]); // Owner's hotels
  const [selectedHotel, setSelectedHotel] = useState(null); // Selected hotel for update
  const [message, setMessage] = useState(''); // Success or error message
  const [isAddingNew, setIsAddingNew] = useState(false); // State for adding a new hotel
  const [hotelDetails, setHotelDetails] = useState({
    name: '',
    location: '',
    phoneNo: '',
    description: '',
    specialFeature: '',
    amenities: '',
    image: '',
  });

  // Fetch owner ID
  useEffect(() => {
    const fetchOwnerId = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/auth/getOwnerId', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwnerId(response.data);
      } catch (error) {
        console.error('Error fetching owner ID:', error);
      }
    };

    fetchOwnerId();
  }, []);

  // Fetch hotels owned by the owner
  const fetchHotels = async () => {
    if (!ownerId) return;
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`http://localhost:8080/api/hotels/gethotelbyownerid/${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [ownerId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails({ ...hotelDetails, [name]: value });
  };

  // Pre-fill fields when clicking update
  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setHotelDetails({
      name: hotel.name,
      location: hotel.location,
      phoneNo: hotel.phoneNo,
      description: hotel.description,
      specialFeature: hotel.specialFeature,
      amenities: hotel.amenities.join(', '),
      image: hotel.image,
    });
  };

  // Add a new hotel
  const handleAddHotel = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post(
        'http://localhost:8080/api/hotels/createhotel',
        {
          ...hotelDetails,
          owner: { ownerId: ownerId },
          amenities: hotelDetails.amenities.split(',').map((amenity) => amenity.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Hotel added successfully!');
      setHotelDetails({
        name: '',
        location: '',
        phoneNo: '',
        description: '',
        specialFeature: '',
        amenities: '',
        image: '',
      });
      setIsAddingNew(false); // Close add form
      fetchHotels(); // Refresh hotels
    } catch (error) {
      console.error('Error adding hotel:', error);
      setMessage('Failed to add hotel.');
    }
  };

  // Update hotel details
  // Update hotel details
const handleUpdateHotel = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.put(
      `http://localhost:8080/api/hotels/updatehotel/${selectedHotel.id}`,
      {
        ...hotelDetails,
        owner: { ownerId: ownerId },
        amenities: hotelDetails.amenities.split(',').map((amenity) => amenity.trim()),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Update the state with the updated hotel
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === selectedHotel.id ? { ...hotel, ...response.data } : hotel
      )
    );

    setMessage('Hotel updated successfully!');
    setSelectedHotel(null); // Reset selected hotel after update
  } catch (error) {
    console.error('Error updating hotel:', error);
    setMessage('Failed to update hotel.');
  }
};


  // Delete hotel
  const handleDeleteHotel = async (hotelId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://localhost:8080/api/hotels/deletehotel/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      setMessage('Hotel deleted successfully!');
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setMessage('Failed to delete hotel.');
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
    <div className="manage-hotels">
      
      <h1>Manage Hotels</h1>
      {message && <p className="message">{message}</p>}

      {/* List of hotels */}
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card2">
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <button onClick={() => handleSelectHotel(hotel)}>Update</button>
            <button onClick={() => handleDeleteHotel(hotel.id)}>Delete</button>
          </div>
        ))}
      </div>

      {!isAddingNew && !selectedHotel && (
        <button className="add-new-hotel-button" onClick={() => setIsAddingNew(true)}>
          Add New Hotel
        </button>
      )}

      {/* Add or Update Hotel Form */}
      {(isAddingNew || selectedHotel) && (
        <div className="hotel-form">
          <h2>{isAddingNew ? 'Add New Hotel' : `Update Hotel: ${selectedHotel.name}`}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isAddingNew ? handleAddHotel() : handleUpdateHotel();
            }}
          >
            <label>
              Hotel Name:
              <input type="text" name="name" value={hotelDetails.name} onChange={handleInputChange} required />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={hotelDetails.location} onChange={handleInputChange} required />
            </label>
            <label>
              Phone Number:
              <input type="text" name="phoneNo" value={hotelDetails.phoneNo} onChange={handleInputChange} required />
            </label>
            <label>
              Description:
              <textarea name="description" value={hotelDetails.description} onChange={handleInputChange} required />
            </label>
            <label>
              Special Feature:
              <input type="text" name="specialFeature" value={hotelDetails.specialFeature} onChange={handleInputChange} />
            </label>
            <label>
              Amenities (comma-separated):
              <input type="text" name="amenities" value={hotelDetails.amenities} onChange={handleInputChange} />
            </label>
            <label>
              Image URL:
              <input type="url" name="image" value={hotelDetails.image} onChange={handleInputChange} />
            </label>
            <button type="submit">{isAddingNew ? 'Add Hotel' : 'Update Hotel'}</button>
            <button type="button" onClick={() => (isAddingNew ? setIsAddingNew(false) : setSelectedHotel(null))}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default ManageHotel;
