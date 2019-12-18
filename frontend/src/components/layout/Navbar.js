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
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={props.logout} href="/login">
            <i className="fas fa-sign-out-alt"/>
            <span>Logout</span>
          </a>
        </li>
      </ul>
  );

  const guestLinks  = (
    <ul className="navbar">
        <li>
          <Link to="/register">
            <i className="fas fa-sign-in-alt" />
            <span>Registers</span>
            </Link>
        </li>
        <li>
          <Link to="/login">
            <i className="fas fa-key" />
            <span>Login</span>
          </Link>
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
