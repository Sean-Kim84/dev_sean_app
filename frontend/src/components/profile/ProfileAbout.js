import React from 'react';

const ProfileAbout = ({
  profile:{
    bio,
    skills,
    user: {
      name
    }
  },
 

}) => {
  return (
    <div className="">
      <h2>{name.trim().split(' ')[0]}'s bio</h2>
      <p>{bio}</p>
      <div>
        {skills.map((skill, index) => (
          <div key={index}>
            <i className="fas fa-check" />
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileAbout;
