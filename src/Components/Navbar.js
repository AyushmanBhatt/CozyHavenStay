import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const user = localStorage.getItem('role');
        if (user) {
            setIsLoggedIn(true);
            setRole(user);
            fetchUserId();
        }
    }, []);

    const fetchUserId = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/getUserId', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserId(response.data);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleBrandClick = () => {
        if (role === 'ROLE_ADMIN') {
            navigate('/admin/dashboard');
        } else if (role === 'ROLE_HOTEL_OWNER') {
            navigate('/hotelowner/dashboard');
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top"  style={{ zIndex: 1030 }}>
            <div className="container-fluid navbar-container">
            <a className="navbar-brand" onClick={handleBrandClick}>
                <img
                    src="/logo.png" // Replace with the path to your logo image
                    alt="Cozy Haven Stay"
                    style={{ height: '60px', // Adjust the height for a small logo
                        width: '250px',  // Maintain aspect ratio
                        marginRight: '8px', marginTop: '0px', display:'block'}} // Adjust the height to fit your navbar
                />
                </a>

                {/* Toggler for Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-container d-flex justify-content-between align-items-center w-100">
                        {/* Search Bar */}
                        {((isLoggedIn && role === 'ROLE_USER') || !isLoggedIn) && (
                        <form className="d-flex search-bar mx-auto">
                            <input
                                className="form-control"
                                type="search"
                                name="hotelName"
                                placeholder="Search Hotels by Name"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        )}

                        {/* Navigation Links */}
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#about-us">About</a>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/user/userprofile/${userId}`}>Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={handleLogout}
                                            style={{
                                                padding: '8px 15px',
                                                fontSize: '16px',
                                                width: 'auto',
                                                whiteSpace: 'nowrap',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signin">Sign In</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
