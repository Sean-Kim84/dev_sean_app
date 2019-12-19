import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-actions">
      <Link to="edit-profile">
        <i className="fas fa-portrait"/>
        <span>Edit Profile</span>
      </Link>
      <Link to="">
        <i className="fas fa-laptop-code" />
        <span>Add Experience</span>
      </Link>
      <Link to="">
        <i className="fas fa-graduation-cap"/>
        <span>Add Education</span>
      </Link>
    </div>
  );
}

export default DashboardActions;
