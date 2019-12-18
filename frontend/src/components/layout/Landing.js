import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Landing = (props) => {
  if(props.isAuthenticated){
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="landing">
      
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
