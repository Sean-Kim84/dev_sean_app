import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
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
  console.log(profile);

  
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

            <div className="">
              <h2>Experience</h2>
              {profile.experience.length > 0 ? (
                <React.Fragment>
                  {profile.experience.map(exp => (
                    <ProfileExperience 
                      key={exp._id} 
                      exp={exp} 
                    />
                  ))}
                </React.Fragment>
                ) : (
                  <h4> No Experience </h4>)
              }
            </div>

            <div className="">
              <h2>Experience</h2>
              {profile.education.length > 0 ? (
                <React.Fragment>
                  {profile.education .map(edu => (
                    <ProfileEducation 
                      key={edu._id} 
                      edu={edu} 
                    />
                  ))}
                </React.Fragment>
                ) : (
                  <h4> No Education </h4>)
              }
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername}/>
            )}

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
