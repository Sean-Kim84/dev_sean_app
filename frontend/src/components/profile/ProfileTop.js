import React from 'react';

const ProfileTop = ({
  profile:{
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div>
      <img src={avatar} alt="user_avatar" />
      <h1>{name}</h1>
      <p>{status} {company && <span>at {company}</span>} </p>
      <p>{location && <span>{location}</span>}</p>
      {website && (<div className="">
        <a  style={{color: "black"}} href={website} className="" target="blank">
          <i className="fas fa-globe"></i>
          website
        </a>
      </div>)}
      {social && social.youtube && (<div className="">
        <a  style={{color: "black"}} href={social.youtube} className="" target="blank">
          <i className="fas fa-globe"></i>
          youtube
        </a>
      </div>)}
      {social && social.twitter && (<div className="">
        <a  style={{color: "black"}} href={social.twitter} className="" target="blank">
          <i className="fas fa-globe"></i>
          twitter 
        </a>
      </div>)}
      {social && social.linkedin && (<div className="">
        <a  style={{color: "black"}} href={social.linkedin} className="" target="blank">
          <i className="fas fa-globe"></i>
          linkedin
        </a>
      </div>)}
      {social && social.instagram && (<div className="">
        <a  style={{color: "black"}} href={social.instagram} className="" target="blank">
          <i className="fas fa-globe"></i>
          instagram
        </a>
      </div>)}
      {social && social.facebook && (<div className="">
        <a  style={{color: "black"}} href={social.facebook} className="" target="blank">
          <i className="fas fa-globe"></i>
          facebook
        </a>
      </div>)}
      
      
      
    </div>
  );
}

export default ProfileTop;
