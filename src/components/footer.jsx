import React from 'react';
import '../styles/footer.scss';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Email: <a href="mailto:info@footprint.com">info@footprint.com</a>
          </p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="footer-section">
          <h3>Address</h3>
          <p>123 Main Street, Cityville</p>
          <p>Country, Zip Code</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>
            <a href="https://twitter.com">Twitter</a> |{' '}
            <a href="https://facebook.com">Facebook</a> |{' '}
            <a href="https://linkedin.com">LinkedIn</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Footprint. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
