import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SearchResults.module.css'; // Corrected import

const SearchResults = () => {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate(); // To redirect user to login if token is missing or expired

    useEffect(() => {
        // Parse query parameters from the URL
        const queryParams = new URLSearchParams(location.search);
        const searchFilters = {
            location: queryParams.get('location'),
            roomType: queryParams.get('roomType'),
        };

        let token = localStorage.getItem("jwtToken");

        if (!token) {
            setError('User not authenticated. Please log in.');
            navigate('/signin'); // Redirect to login page
            return;
        }

        // Fetch data from the backend using axios
        axios
            .get("http://localhost:8080/api/hotels/search", {
                params: searchFilters, // Add the search filters as URL query parameters
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                // Update state with the received hotel data
                if (response.data && response.data.length > 0) {
                    setHotels(response.data);
                } else {
                    setError('No hotels found matching your search criteria.');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    setError('Your session has expired. Please log in again.');
                    navigate('/signin'); // Redirect to login page on expired token
                } else {
                    setError('Error fetching hotels. Please try again later.');
                }
            });
    }, [location.search, navigate]); // Added navigate to the dependency array

    return (
        <div className={styles.searchResultsContainer}>
            <h1>Search Results</h1>
            {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error message */}
            {hotels.length > 0 ? (
                <ul className={styles.hotelList}>
                    {hotels.map((hotel) => (
                        <li key={hotel.id} className={styles.hotelItem}>
                            <img src={hotel.image} alt={hotel.name} />
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '1.5rem'}}>{hotel.name}</h2>
                            <p style={{ fontSize: '1rem', color: '#555', margin: '10px 10px' }}>{hotel.description}</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e67e22' }}>{hotel.location}</p>
                            <Link to={`/hotel/${hotel.id}`} className={styles.btn}>View Details</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>Loading hotels...</p> // Display a loading message when hotels are being fetched
            )}
        </div>
    );
};

export default SearchResults;
