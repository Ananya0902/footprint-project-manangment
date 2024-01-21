import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setAuthToken } from './AuthAxios';

// Reload on refresh and persist user Token from local storage 
window.onload = ()=>{
  console.log("Reloading");
  setAuthToken(localStorage.getItem('userToken'));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />
  
);


