import React, { useState } from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [roomType, setRoomType] = useState('Deluxe');
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const navigate = useNavigate();

    const handleSearch = () => {
        // Create a query object
        const queryParams = {
            location,
            roomType,
            
        };

        // Redirect to search results page with query parameters
        const queryString = new URLSearchParams(queryParams).toString();
        navigate(`/user/search?${queryString}`);
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1>Book Hotels and Homestays</h1>
                <div className="search-container">
                    <div className="search-fields">
                        <input
                            type="text"
                            placeholder="Location"
                            className="search-input"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <input
                            type="date"
                            className="date-input"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                        <input
                            type="date"
                            className="date-input"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                        <select
                            className="guest-input"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value="Deluxe">Deluxe</option>
                            <option value="Superior">Superior</option>
                            <option value="Premium">Premium</option>
                            <option value="Suite">Suite</option>
                        </select>
                        <select
                            className="guest-input"
                            value={rooms}
                            onChange={(e) => setRooms(Number(e.target.value))}
                        >
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                        </select>
                        <select
                            className="guest-input"
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value))}
                        >
                            <option value="1">1 Adult</option>
                            <option value="2">2 Adults</option>
                            <option value="3">3 Adults</option>
                            <option value="4">4 Adults</option>
                        </select>
                        <select
                            className="guest-input"
                            value={children}
                            onChange={(e) => setChildren(Number(e.target.value))}
                        >
                            <option value="0">No Children</option>
                            <option value="1">1 Child</option>
                            <option value="2">2 Children</option>
                            <option value="3">3 Children</option>
                        </select>
                    </div>
                    <button className="search-button" onClick={handleSearch}>
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
