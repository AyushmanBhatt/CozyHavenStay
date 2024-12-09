import React from 'react';
import { Link } from 'react-router-dom';
import './PopularLocation.css';

const PopularLocation = () => {
  const locations = [
    { name: 'Paris', image: 'https://media.timeout.com/images/106181719/750/562/image.jpg', id: 'paris' },
    { name: 'New York', image: 'https://images.musement.com/cover/0002/42/view-on-manhattan-at-night-new-york-city_header-141511.jpeg?w=1200&h=630&q=95&fit=crop', id: 'new-york' },
    { name: 'Tokyo', image: 'https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D', id: 'tokyo' },
    { name: 'Sydney', image: 'https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg', id: 'sydney' },
    { name: 'Jaipur', image: 'https://www.agoda.com/wp-content/uploads/2024/05/Nahargarh-Fort-jaipur-india-1244x700.jpg', id: 'jaipur' }
  ];

  return (
    <div className="popular-location">
      <h2>Popular Locations</h2>
      <div className="locations-container">
        {locations.map((location) => (
          <Link to={`/hotelsbylocation?location=${location.name}`} key={location.name} className="location-link">
            <div className="location-card">
              <img src={location.image} alt={location.name} className="location-image" />
              <h3 className="location-name">{location.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularLocation;
