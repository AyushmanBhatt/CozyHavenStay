import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddHotel.css';

const AddHotel = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState(''); // Assuming this is a numeric ID
  const [phoneNo, setPhoneNo] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [specialFeature, setSpecialFeature] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert amenities string into an array by splitting on commas
    const amenitiesArray = amenities.split(',').map(item => item.trim());

    // Ensure the owner ID is a number (if it's a valid numeric string)
    const ownerId = isNaN(owner) ? null : Number(owner);

    const hotelData = {
      name,
      location,
      owner: { ownerId },  // Send owner as an object with ownerId
      phoneNo,
      description,
      amenities: amenitiesArray,  // Send amenities as an array
      specialFeature,
      image: imageUrl, // Use the image URL
    };
    console.log(hotelData);

    let token = localStorage.getItem("jwtToken");

    // Send the request to the backend
    axios.post("http://localhost:8080/api/hotels/createhotel", hotelData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Hotel Added:', response.data);
      navigate('/admin/hotels'); // Redirect to hotels list page
    })
    .catch((error) => {
      console.error('Error adding hotel:', error);
    });
  };

  return (
    <div className="add-hotel">
      <h1>Add New Hotel</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hotel Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hotel Owner ID</label>
          <input
            type="number"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amenities (comma-separated)</label>
          <input
            type="text"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Special Feature</label>
          <input
            type="text"
            value={specialFeature}
            onChange={(e) => setSpecialFeature(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Hotel</button>
      </form>
    </div>
  );
};

export default AddHotel;
