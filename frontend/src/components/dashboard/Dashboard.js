import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';


const Dashboard = ({ getCurrentProfile, auth, profile: { profile, loading }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? <Spinner /> : <React.Fragment>
      <h2>Dash Board</h2>
        <i className="fas fa-user-alt" />
        
        {profile != null ? 
          <React.Fragment><p>has </p></React.Fragment> : 
          <React.Fragment><p>has not</p></React.Fragment>}
    </React.Fragment>
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
