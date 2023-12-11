// components/Register.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [province, setProvince] = useState('north');
  const [userType, setUserType] = useState('applicant');

  const handleRegister = () => {
    // Perform registration logic here
    onRegister({ name, email, password, province, userType });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{' '}
        <span className="switch-link" onClick={onSwitchToLogin}>
        <NavLink to="/login" >Login here.</NavLink>
        </span>
      </p>
    </div>
  );
};

export default Register;
