import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions'


const Dashboard = ({ getCurrentProfile, auth, profile: { profile, loading }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? <Spinner /> : <React.Fragment>
      <h2>Dash Board</h2>
        <i className="fas fa-user-alt" />
        Welcome {auth.user && auth.user.name}
        {profile != null ? 
          (<React.Fragment><DashboardActions /></React.Fragment>):
          <React.Fragment>
            <p>You have not yet setup a  Profile, Plesae add some Info</p>
            <Link to="/create-profile">
              <button>Create Profile</button>
            </Link>
          </React.Fragment>}
    </React.Fragment>
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
