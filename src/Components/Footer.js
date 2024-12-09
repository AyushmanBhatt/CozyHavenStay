import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-center text-lg-start bg-light text-muted">
      {/* Social Media Section */}
      <section className="social-media-section d-flex justify-content-center p-4 border-bottom">
        <div>
          <span>Connect with us on social media:</span>
        </div>
        <div className="social-icons">
          <a href="#" className="me-4 text-reset">
            <FaFacebookF />
          </a>
          <a href="#" className="me-4 text-reset">
            <FaTwitter />
          </a>
          <a href="#" className="me-4 text-reset">
            <FaInstagram />
          </a>
          <a href="#" className="me-4 text-reset">
            <FaLinkedin />
          </a>
        </div>
      </section>

      {/* Footer Content Section */}
      <section>
        <div className="container text-center text-md-start mt-4">
          <div className="row">
            {/* Company Info */}
            <div className="col-md-4 col-lg-4 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Cozy Haven Stay</h6>
              <p>We provide the best hotel options for your travel. Explore new destinations and experience luxury at affordable prices.</p>
            </div>

            {/* Quick Links */}
            <div className="col-md-2 col-lg-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
              <p><a href="#app" className="text-reset">Home</a></p>
              <p><a href="#hotels" className="text-reset">Hotels</a></p>
              <p><a href="#about-us" className="text-reset">About Us</a></p>
              <p><a href="#faq" className="text-reset">FAQ</a></p>
            </div>

            {/* Contact Info */}
            <div className="col-md-4 col-lg-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <div className="contact-info">
                <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                <p><i className="fas fa-envelope me-3"></i> info@cozyhavenstay.com</p>
                <p><i className="fas fa-phone me-3"></i> + 01 234 567 89</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom Text */}
      <div className="footer-text text-center p-4">
        © 2024 Cozy Haven Stay. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
