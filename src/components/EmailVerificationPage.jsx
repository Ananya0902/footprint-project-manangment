import React, { useState } from 'react';
import '../styles/EmailVerificationPage.scss'; 

const EmailVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyEmail = async () => {
    try {
      // Call your backend API to generate and send a unique verification code to the given email
      // Example: const response = await api.generateVerificationCode(email);
      // Replace the following line with actual logic based on your backend response
      const generatedVerificationCode = '123456'; // Replace with actual verification code

      // Simulate the verification process by comparing the entered code with the generated one
      if (verificationCode === generatedVerificationCode) {
        setIsVerified(true);
        // Call your backend API to mark the email as verified
        // Example: await api.markEmailAsVerified(email);
      } else {
        alert('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error during email verification:', error);
    }
  };

  return (
    <div className="containerVerify"> 
      <h2 className="header">Email Verification</h2>

      {!isVerified ? (
        <div>
          <label className="email-label">Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} className="email-input" />
          <br />
          <label className="code-label">Verification Code:</label>
          <input type="text" value={verificationCode} onChange={handleVerificationCodeChange} className="code-input" />
          <br />
          <button onClick={handleVerifyEmail} className="verify-button">Verify Email</button>
        </div>
      ) : (
        <p className="success-message">Email successfully verified!</p>
      )}
    </div>
  );
};

export default EmailVerificationPage;

