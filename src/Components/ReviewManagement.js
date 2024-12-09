import React, { useState, useEffect } from 'react';
import './ReviewManagement.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('jwtToken');

  // Fetch all reviews using Axios
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/reviews/getallreviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load reviews');
        setLoading(false);
      });
  }, [token]);

  // Handle deleting a review using Axios
  const handleDeleteReview = (id) => {
    axios
      .delete(`http://localhost:8080/api/reviews/deletereviewbyid/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
        console.log(`Review with ID ${id} deleted.`);
      })
      .catch((err) => {
        console.error('Failed to delete review:', err);
      });
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="review-management">
      <div className="sidebar">
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/hotels">Hotels</Link></li>
          <li><Link to="/admin/bookings">Bookings</Link></li>
          <li><Link to="/admin/reviews">Reviews</Link></li>
        </ul>
      </div>
      <h1>Manage Reviews</h1>
      {reviews.length > 0 ? (
        <table className="review-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.user.name}</td>
                <td>{review.hotel.name}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewManagement;
