import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/register.scss';
import EmailVerificationPage from './EmailVerificationPage';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [province, setProvince] = useState('north');
  const [userType, setUserType] = useState('applicant');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(true);

  const handleRegister = async () => {
    try {
      // Perform registration logic here
      const response = await onRegister({ name, email, password, province, userType });

      // Assuming the registration returns success and includes the verification code
      const generatedVerificationCode = response.verificationCode;

      // Simulate the email verification process by setting the verification code
      setVerificationCode(generatedVerificationCode);

      // Move to the email verification step
      setIsVerificationComplete(true);

      // Enable the Register button after successful registration
      setIsRegisterButtonDisabled(false);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleVerifyEmail = async () => {
    // Redirect to EmailVerificationPage for the user to enter and verify the code
    // You may use a routing library for this, like react-router-dom
    // For simplicity, alerting the verification code here
    alert(`Verification Code: ${verificationCode}`);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
    // Enable or disable the Register button based on whether the verification code is entered
    setIsRegisterButtonDisabled(!e.target.value);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      {isVerificationComplete || (
        <div>
          <button onClick={handleVerifyEmail} disabled={!email} className="verify-button">
            Verify Email
          </button>
        </div>
      )}

      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Province:</label>
      <select value={province} onChange={(e) => setProvince(e.target.value)}>
        <option value="north">North</option>
        <option value="south">South</option>
        <option value="central">Central</option>
      </select>
      <label>User Type:</label>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="applicant">Applicant</option>
        <option value="reviewer">Reviewer</option>
        <option value="approval">Approval</option>
      </select>
      <button onClick={handleRegister} disabled={isRegisterButtonDisabled}>
        Register
      </button>
      <p>
        Already have an account?{' '}
        <span className="switch-link" onClick={onSwitchToLogin}>
          <NavLink to="/login">Login here.</NavLink>
        </span>
      </p>

      {isVerificationComplete && (
        <EmailVerificationPage
          email={email}
          verificationCode={verificationCode}
        />
      )}
    </div>
  );
};

export default Register;



