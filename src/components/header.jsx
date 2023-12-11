import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Header = () => {
  return (
    <nav>
      <h1>FOOTPRINT</h1>
      <hr />
      <main>
        <HashLink to="/#home">Home</HashLink>
        <HashLink to="/#about">About Us</HashLink>
        <NavLink to="/contact" activeClassName="active-link">Contact Us</NavLink>
        <NavLink to="/projects" activeClassName="active-link">Projects</NavLink>
        {/* <NavLink to="/user" activeClassName="active-link" className="user-link">User</NavLink> */}
        <NavLink to="/login">
          <button className='btnLogin-popup'>Login</button>
        </NavLink>
        </main>

    </nav>
  );
}

export default Header;
