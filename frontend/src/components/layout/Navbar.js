import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = (props) => {

  const authLinks  = (
    <ul className="navbar">
        <li>
          <Link to="/">Devs</Link>
        </li>
        <li onClick={props.logout}>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
  );

  const guestLinks  = (
    <ul className="navbar">
        <li>
          <Link to="/register">Registers</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
  )
  
  return (
    <header>
      <h2 className="maintitle">
        <Link to="/"><i className="fas fa-code"></i>DevHub</Link>
      </h2>
      {!props.auth.loading && (<React.Fragment>{props.auth.isAuthenticated ? authLinks :  guestLinks}</React.Fragment>) }
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
