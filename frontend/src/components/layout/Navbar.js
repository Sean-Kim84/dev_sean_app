import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <h2 className="maintitle">
        <Link to="/"><i className="fas fa-code"></i>DevHub</Link>
      </h2>
      <ul className="navbar">
        <li>
          <Link to="/">Devs</Link>
        </li>
        <li>
          <Link to="/register">Registers</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
