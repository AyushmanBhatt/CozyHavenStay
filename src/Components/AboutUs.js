import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const features = [
    {
      icon: '🏨',
      title: 'Extensive Hotel Options',
      description: 'Best hotels available for different destinations to offer you the stay of a lifetime.',
    },
    {
      icon: '💰',
      title: 'Savings on Hotel Booking',
      description: 'Enjoy hotel bookings with the best offers and discounts to make your stay unforgettable.',
    },
    {
      icon: '⭐',
      title: 'Hotel Ratings',
      description: 'All our hotels have good ratings on trusted platforms and are recommended by users.',
    },
    {
      icon: '🏝️',
      title: 'Best Price',
      description: 'Get excellent hotels and resorts at the best prices to pamper your desires.',
    },
  ];

  return (
    <div className="about-us">
      {/* About Section */}
      <section className="about-website">
        <h2>About Cozy Haven Stay</h2>
        <p>
          Cozy Haven Stay is designed to make hotel booking seamless, affordable, 
          and enjoyable. We connect travelers with the best hotels, offering verified 
          reviews, exclusive deals, and a user-friendly booking experience.
        </p>
        <p>
          Whether you're planning a weekend getaway or a long vacation, we've got 
          you covered. Our platform is trusted by thousands of happy travelers!
        </p>
      </section>

      
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-container">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
