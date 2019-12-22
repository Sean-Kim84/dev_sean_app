import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileItem = ({ profile:{ 
  user: {_id, name, avatar}, 
  status, 
  company, 
  location, 
  skills} }) => {

  return (
    <div className="">
      <img src={avatar} alt="profile_image" />
      <div className="">
        <h2>{name}</h2>
        <p>{status} {company && <span>at {company}</span>}</p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`}>View Profile</Link>
      </div>
      <ul>
        {skills.slice(0,4).map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default connect(null, {})(ProfileItem);
