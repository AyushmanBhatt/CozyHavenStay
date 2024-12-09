import React, { useState, useEffect } from 'react';
import './AllHotels.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hotels/getallhotel'); // Replace with your backend URL
        setHotels(response.data);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError('Failed to load hotels. Please try again later.');
      }
    };

    fetchHotels();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="all-hotels-container">
      <h2>All Hotels</h2>
      <div className="hotel-cards-container">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <div className="hotel-details">
              <h3 className="hotel-name">{hotel.name}</h3>
              <p className="hotel-description">{hotel.description}</p>
              <p className="hotel-location">{hotel.location}</p>
              <Link to={`/hotel/${hotel.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHotels;
