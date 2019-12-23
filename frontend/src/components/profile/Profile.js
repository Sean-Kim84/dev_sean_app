import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';

const Profile = ({ 
  getProfileById,
  profile: { profile, loading }, 
  auth, 
  match 
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById])
  
  return (
    <React.Fragment>
      {loading || profile === null ? <Spinner /> : (
          <React.Fragment>
            <Link style={{color: "black"}} to={'/profiles'}>Back to Profiles</Link>
            {auth.isAuthenticated && 
             auth.loading === false && 
             auth.user._id === profile.user._id &&
             ( 
              <Link style={{ color: 'black' }} to="/edit-profile">
                Edit Profile
              </Link>
            )}
            <div className="">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
            </div>
            
          </React.Fragment>
        )}
    </React.Fragment>
  );
};

const mapStateToProps  = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
