import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from '../../components/profiles/ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getProfiles();
  }, []);
  console.log(profiles);

  return (
    <React.Fragment>
      {loading ? <Spinner /> : <React.Fragment>
          <h1>Developers</h1>
          <p>
            <i className="fab fa-connectdevelop" />
            Browse and connect with Developers
          </p>
        </React.Fragment>}
        <div className="">
          {profiles.length > 0 ? (
            profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
          ) : (<h4>No Profile Fount...</h4>)}
        </div>
    </React.Fragment>
  );
}

const mapStateToProps = state  => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
