import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './HotelsByLocation.css';

const HotelsByLocation = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchHotels = async () => {
      const location = searchParams.get('location');
      if (!location) return;

      try {
        const response = await axios.get('http://localhost:8080/api/hotels/searchbylocation', {
          params: { location },
        });
        setHotels(response.data);
      } catch (err) {
        console.error('Error fetching hotels by location:', err);
        setError('Failed to load hotels. Please try again later.');
      }
    };

    fetchHotels();
  }, [searchParams]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="hotels-by-location">
      <h2>Hotels in {searchParams.get('location')}</h2>
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

export default HotelsByLocation;
