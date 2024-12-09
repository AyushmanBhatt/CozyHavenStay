import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();  // Get userId from params
    const [userDetails, setUserDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const [reviewFormData, setReviewFormData] = useState({
        hotel: {id:null},
        comment: '',
        rating: 1,
    });

    const [editingReview, setEditingReview] = useState(null); // Track review editing

    useEffect(() => {
        if (userId) {
            fetchUserDetails(userId);
            fetchUserReviews(userId);
            fetchUserBookings(userId);
        }
    }, [userId]);

    // Fetch user details
    const fetchUserDetails = async (userId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.get(`http://localhost:8080/api/users/getuser/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUserDetails(response.data);
            setFormData({
                name: response.data.name,
                username: response.data.username,
                email: response.data.email,
                password: '', // Don't pre-fill password for security
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // Fetch user reviews
    const fetchUserReviews = async (userId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.get(`http://localhost:8080/api/reviews/getreviewbyuserid/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching user reviews:', error);
        }
    };

    // Fetch user bookings
    const fetchUserBookings = async (userId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings/getbookingbyuserid/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching user bookings:', error);
        }
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle review input change
    const handleReviewInputChange = (e) => {
        const { name, value } = e.target;
        setReviewFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission to update user details
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        try {
            await axios.put(`http://localhost:8080/api/users/updateuser/${userId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            fetchUserDetails(userId);  // Refresh user details after update
            setIsEditing(false); // Close edit form
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    // Handle review submission
    const handleReviewSubmit = async (e, bookingId) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const reviewData = {
            ...reviewFormData,
            user: userDetails, // Send the full user object
            //hotel: { id: reviewFormData.hotel.id }, // Send the hotel object with an ID
            hotel: reviewFormData.hotel
        };
        console.log(reviewData);
        
        try {
            if (editingReview) {
                await axios.put(`http://localhost:8080/api/reviews/updatereviewbyid/${editingReview.id}`, reviewData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post('http://localhost:8080/api/reviews/createreview', reviewData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
            console.log(reviewData);
            fetchUserReviews(userId);  // Refresh reviews after submit
            //setReviewFormData({ hotel: null, comment: '', rating: 1 });
            setEditingReview(null); // Reset review editing state
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Start editing a review
    const handleEditReviewClick = (review) => {
        setEditingReview(review);
        setReviewFormData({
            hotel: review.hotel,
            comment: review.comment,
            rating: review.rating,
        });
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {userDetails ? (
                <div>
                    {!isEditing ? (
                        <div>
                            <h3>{userDetails.name}</h3>
                            <p>Username: {userDetails.username}</p>
                            <p>Email: {userDetails.email}</p>
                            <button className="btn btn-outline-primary" onClick={handleEditClick}>
                                Update Profile
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h3>Update Profile</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-outline-success">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}

            {/* User Reviews Section */}
            <div className="reviews-section">
                <h3>Your Reviews</h3>
                {reviews.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Review ID</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Hotel</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.id}>
                                    <td>{review.id}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.hotel.name}</td>
                                    
                                    <td>
                                        <button
                                            className="btn btn-outline-info"
                                            onClick={() => handleEditReviewClick(review)}
                                        >
                                            Edit Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>You haven't left any reviews yet.</p>
                )}
            </div>

            {/* Bookings Section */}
            <div className="bookings-section">
                <h3>Your Bookings</h3>
                {bookings.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Hotel Name</th>
                                <th>Check-in Date</th>
                                <th>Check-out Date</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.hotelId}</td>
                                    <td>{booking.arrivalDate}</td>
                                    <td>{booking.departureDate}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => {
                                                setReviewFormData({
                                                    hotel: {id:booking.hotelId},
                                                    comment: '',
                                                    rating: 1,
                                                }); 
                                            }}
                                        >
                                            Write Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                ) : (
                    <p>You have no bookings yet.</p>
                )}
            </div>

            {/* Review Form */}
            {(reviewFormData.hotel !== null) && (
                <div className="review-form">
                    <h3>{editingReview ? 'Edit Review' : 'Write a Review'}</h3>
                    <form onSubmit={(e) => handleReviewSubmit(e, bookings[0]?.id)}>
                        <div className="mb-3">
                            <label htmlFor="rating" className="form-label">Rating</label>
                            <select
                                className="form-control"
                                id="rating"
                                name="rating"
                                value={reviewFormData.rating}
                                onChange={handleReviewInputChange}
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <option key={star} value={star}>{star}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <textarea
                                className="form-control"
                                id="comment"
                                name="comment"
                                value={reviewFormData.comment}
                                onChange={handleReviewInputChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-outline-success">
                            {editingReview ? 'Update Review' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
