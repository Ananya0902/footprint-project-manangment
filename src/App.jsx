import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Footer from './components/footer';
import Contact from './components/contact';
import Login from './components/login';
import Register from './components/register';
import Learn from './components/learn';

import './styles/app.scss';
import './styles/header.scss';
import './styles/home.scss';
import './styles/footer.scss';
import './styles/contact.scss';
import './styles/login.scss';
import './styles/register.scss';
import './styles/learn.scss';



const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;


