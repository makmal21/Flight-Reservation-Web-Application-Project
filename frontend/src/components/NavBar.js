// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <nav className="nav-bar">

        <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/register" className="nav-link">Register for Membership</Link> 
            <Link to="/cancel-flight" className="nav-link">Cancel a Flight</Link>
        </div>

        <div className="nav-link-right">
            <Link to="/login" className="nav-link">Login</Link>
        </div>

    </nav>
  );
}

export default NavBar;
