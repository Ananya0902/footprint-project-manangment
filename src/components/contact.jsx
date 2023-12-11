// components/ContactUs.jsx

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/contact.scss';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('your-service-id', 'your-template-id', {
      to_email: 'your-email@example.com',
      user_full_name: fullName,
      user_email: email,
      user_message: message,
    }, 'your-user-id')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setSent(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      {sent ? (
        <p>Your message has been sent. Thank you!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
