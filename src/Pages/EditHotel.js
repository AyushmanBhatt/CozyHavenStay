import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditHotel.css';

const EditHotel = () => {
  const { id } = useParams();  // Get hotel ID from URL
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [description, setDescription] = useState('');
  const [specialFeature, setSpecialFeature] = useState('');
  const [amenities, setAmenities] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        let token = localStorage.getItem("jwtToken");
        const response = await axios.get(`http://localhost:8080/api/hotels/gethotelbyid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const hotelData = response.data;
        setName(hotelData.name);
        setLocation(hotelData.location);
        setOwner(hotelData.owner);
        setPhoneNo(hotelData.phoneNo);
        setDescription(hotelData.description);
        setSpecialFeature(hotelData.specialFeature);
        setAmenities(hotelData.amenities.join(', ')); // Convert amenities array to string
        setImage(hotelData.image);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    

    const updatedHotel = {
      name,
      location,
      owner: { ownerId: owner },  // Use ownerId as a number
      phoneNo,
      description,
      specialFeature,
      amenities: amenities.split(',').map((amenity) => amenity.trim()), // Convert back to array
      image,
    };

    try {
      let token = localStorage.getItem("jwtToken");
      const response = await axios.put(`http://localhost:8080/api/hotels/updatehotel/${id}`, updatedHotel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Updated Hotel:', response.data);
      navigate('/admin/hotels');
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  return (
    <div className="edit-hotel">
      <h1>Edit Hotel</h1>
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
          <label>Hotel Owner</label>
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
          <label>Special Feature</label>
          <input 
            type="text" 
            value={specialFeature} 
            onChange={(e) => setSpecialFeature(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Amenities (comma-separated)</label>
          <input 
            type="text" 
            value={amenities} 
            onChange={(e) => setAmenities(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="url" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
          />
        </div>
        <button type="submit" className="submit-btn">Update Hotel</button>
      </form>
    </div>
  );
};

export default EditHotel;
