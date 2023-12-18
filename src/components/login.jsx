// components/Login.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    onLogin({ email, password });
    
  };

  return (
    <div className="form-container">
      <h2>Log in</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button  className='log' onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <span className="switch-link" onClick={onSwitchToRegister}>
        <NavLink to="/register" >Register here.</NavLink>
        </span>
      </p>
    </div>
  );
};

export default Login;
