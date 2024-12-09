import React, { useState, useEffect } from 'react';
import './HotelCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HotelCard = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hotels/getallhotel');
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
    <>
      {hotels.slice(0, 4).map((hotel) => (
        <div key={hotel.id} className="hotel-card">
          <img src={hotel.image} alt={hotel.name} className="hotel-image1" />
          <div className="hotel-details">
            <h3 className="hotel-name">{hotel.name}</h3>
            <p className="hotel-description">{hotel.description}</p>
            <p className="hotel-location">{hotel.location}</p>
            <Link to={`/hotel/${hotel.id}`} className="btn btn-primary">View Details</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelCard;
