import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import './HotelDetail.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import BookingForm from '../Components/BookingForm';
import axios from 'axios'; 

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/hotels/gethotelbyid/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const amenityIcons = ['🌊', '📶', '🏊‍♂️', '💆', '🍽️', '🥾', '🔥', '🛁'];

  const calculateAverageRating = () => {
    if (!hotel.reviews || hotel.reviews.length === 0) return 0;
    const totalRating = hotel.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / hotel.reviews.length).toFixed(1); // Return average with 1 decimal place
  };

  const reviewCount = hotel?.reviews?.length || 0; // Get number of reviews

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="hotel-detail-container">
        <div className="hotel-detail-header">
          <img src={hotel.image} alt={hotel.name} className="hotel-detail-image" />
          <div className="hotel-detail-info">
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
            <p><strong>Contact:</strong> {hotel.phoneNo}</p>
            <p><strong>Location:</strong> {hotel.location}</p>

            <div className="hotel-review-info" style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ marginRight: '10px' }}>
                <strong>{calculateAverageRating()} ⭐</strong>
              </p>
              <p style={{ fontWeight: 'lighter' }}>
                <strong>({reviewCount}) </strong>
              </p>
            </div>

            <div className="booking-section">
              <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
            </div>
          </div>
        </div>

        {/* Open Booking Form modal with hotel details */}
        {isModalOpen && (
          <BookingForm
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            hotelDetails={hotel} // Pass the entire hotel details to BookingForm
          />
        )}

        <div className="special-feature">
          <h2>Why Stay Here?</h2>
          <p>{hotel.specialFeature}</p>
        </div>

        <div className="hotel-rooms">
          <h3>Rooms and Pricing</h3>
          <ul>
            {hotel.rooms.map((room, index) => (
              <li key={index}>
                <h4>{room.roomType}</h4>
                <p><strong>Price per night:</strong> ${room.baseFare}</p>
                <p><strong>Features:</strong> {room.features.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="hotel-amenities">
          <h3>Amenities</h3>
          <div className="amenities-grid">
            {hotel.amenities.map((amenity, index) => (
              <div key={index} className="amenity">
                <span>{amenityIcons[index % amenityIcons.length]}</span> {amenity}
              </div>
            ))}
          </div>
        </div>

        <div className="property-rules">
          <h3>Property Rules</h3>
          <ul>
            <li>
              <span role="img" aria-label="clock">⏰</span> Check-in: After 03:00 PM, Check-out: 11:00 AM
            </li>
            <li>
              <span role="img" aria-label="calendar">📅</span> Cancellation till check-in available, with ClearChoice Max
            </li>
            <li>
              <span role="img" aria-label="age restriction">🔞</span> Guests below 18 years of age allowed
            </li>
            <li>
              <span role="img" aria-label="alcohol">🍹</span> Alcohol consumption allowed within the premises
            </li>
            <li>
              <span role="img" aria-label="no pets">🚫🐾</span> Pets NOT allowed within the premises
            </li>
          </ul>
        </div>

        <div className="hotel-reviews">
          <h3>Reviews</h3>
          {hotel.reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>{review.user.name}</strong> ({review.rating} stars): {review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </a>
          </div>
          <p>&copy; 2024 Cozy Haven Stay. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default HotelDetail;
