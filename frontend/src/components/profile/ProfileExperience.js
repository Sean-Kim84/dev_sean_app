import React from 'react';
import Moment from 'react-moment';


const ProfileExperience = ({ 
  exp: {
    company, title, location, current, to, from, description
  } 
}) => {
  return (
    <div>
      <h3>{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>} 
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
      
    </div>  
  );
}

export default ProfileExperience;