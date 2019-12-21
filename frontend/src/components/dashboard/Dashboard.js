import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCurrentProfile,
  deleteAccount
} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions'
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({ getCurrentProfile, auth, profile: { profile, loading }, deleteAccount}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  //Redirecet if logged in
  if (!auth.isAuthenticated) {
    return <Redirect to = "/" / >
  }

  return loading && profile === null ? <Spinner /> : <React.Fragment>
      <h2>Dash Board</h2>
        <i className="fas fa-user-alt" />
        Welcome {auth.user && auth.user.name}
        {profile != null ? (
          <React.Fragment>
            <DashboardActions />
            <Experience experience={profile.experience}/>
            <Education education={profile.education} />
            <div>
              <i className="fas fa-user-slash" />
              <button onClick={() => deleteAccount()}>Delete Account</button>
            </div>
          </React.Fragment> ) : (
          <React.Fragment>
            <p>You have not yet setup a  Profile, Plesae add some Info</p>
            <Link to="/create-profile">
              <button>Create Profile</button>
            </Link>
          </React.Fragment>)}
    </React.Fragment>
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount
})(Dashboard);
