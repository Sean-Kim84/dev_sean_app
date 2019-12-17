import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {
  return props.alerts !== null && 
    props.alerts.length > 0 &&
    props.alerts.map(alert => (
      <div 
        className='alert'
        key={alert.id}>
        {alert.msg}
      </div>
  ))
};

const mapStateToProps = state => ({
  alerts: state.alert  // root Reducer로 부터 온 이름   
})

export default connect(mapStateToProps)(Alert);
