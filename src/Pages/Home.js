import React from 'react';
import HeroSection from '../Components/HeroSection';
import HotelCard from '../Components/HotelCard';
import './Home.css';
import PopularLocation from '../Components/PopularLocation';
import AboutUs from '../Components/AboutUs';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div id="home">
      <div id="hero-section">
        <HeroSection />
      </div>
      <div className="hotel-list" id="hotels">
        <h2>Featured Hotels</h2>
        <div className="hotel-cards-container">
          <HotelCard />
        </div>
        <div className="view-all-container">
        <Link to="/allhotels">
          <button className="view-all-button">View All Hotels</button>
        </Link>
        </div>
      </div>
      <div className="popular-locations-container">
        <PopularLocation />  
      </div>
      <div id="about-us">
        <AboutUs />
      </div>
      
      <Footer />
      
    </div>
  );
};

export default Home;
