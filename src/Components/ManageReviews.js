import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageReviews.css';
import { Link } from 'react-router-dom';

const ManageReviews = () => {
  const [ownerId, setOwnerId] = useState(null); // To store the logged-in owner's ID
  const [hotels, setHotels] = useState([]); // List of hotels for the owner
  const [selectedHotelId, setSelectedHotelId] = useState(null); // Selected hotel ID
  const [reviews, setReviews] = useState([]); // Reviews for the selected hotel
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

  // Fetch reviews for the selected hotel
  const fetchReviews = async (hotelId) => {
    setSelectedHotelId(hotelId); // Set the selected hotel
    setReviews([]); // Clear previous reviews
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`http://localhost:8080/api/reviews/getreviewbyhotelid/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(response.data); // Set reviews for the selected hotel
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Delete a review
  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://localhost:8080/api/deletereviewbyid/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId)); // Remove deleted review from the list
      setMessage('Review deleted successfully!'); // Success message
    } catch (error) {
      console.error('Error deleting review:', error);
      setMessage('Failed to delete review.'); // Error message
    }
  };

  return (<>
  {/* Reviews Section */}
  <div className="sidebar">
          <ul>
            <li><Link to="/hotelowner/dashboard">Dashboard</Link></li>
            <li><Link to="/hotelowner/hotels">Hotels</Link></li>
            <li><Link to="/hotelowner/bookings">Bookings</Link></li>
            <li><Link to="/hotelowner/rooms">Rooms</Link></li>
            <li><Link to="/hotelowner/reviews">Reviews</Link></li>
          </ul>
        </div>
    <div className="manage-reviews">
      <h1>Manage Reviews</h1>
      {message && <p className="message">{message}</p>}

      {/* Hotel Selection */}
      <div className="hotel-selector">
        <h2>Select a Hotel</h2>
        <div className="hotel-cards">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={`hotel-card2 ${selectedHotelId === hotel.id ? 'active' : ''}`}
              onClick={() => fetchReviews(hotel.id)} // Fetch reviews when a hotel is clicked
            >
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
            </div>
          ))}
        </div>
      </div>

      
      {selectedHotelId ? (
        
        <div className="reviews-section">
          
          <h2>Reviews for Selected Hotel</h2>
          {reviews.length === 0 ? (
            <p>No reviews available for this hotel.</p>
          ) : (
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>Reviewer Name</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.user.name}</td>
                    <td>{review.comment}</td>
                    <td>{review.rating} / 5</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteReview(review.id)} // Call delete review handler
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
        <p>Please select a hotel to view its reviews.</p>
      )}
    </div>
    </>
  );
};

export default ManageReviews;
