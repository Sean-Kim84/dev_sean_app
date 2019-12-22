import React, { useState } from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({addExperience, history}) => {
  const [formData, setFormData] = useState({
    company: '',
    title:'',
    location:'',
    from: '',
    to: '',
    current: false,
    description: '' 
  });
  
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  
  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value}) 
  }

  return (
    <React.Fragment>
      <div className="form_title">
        <h1>Add an Experience</h1>
        <p>
          <i className="fas fa-user-alt" />
          Add any developer/programming postions
        </p>
      </div>
      <form className="form_container" onSubmit={e => {
        e.preventDefault();
        addExperience(formData, history);
      }  
      }>
        <div className="form_left">
          <div className="form-group">
            <input type="text" className="" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Company" name="company" value={company} onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          </div>
          <div className="form-group">
            <p>
              <input 
                style={{margin: 0}}
                type="checkbox" 
                className="" 
                placeholder="Company" 
                name="current" 
                checked={current}
                value={current} 
                onChange={e => {
                  setFormData({...formData, current: !current})
                  toggleDisabled(!toDateDisabled);
                }
              }/>
              Current Job{` `}
            </p>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" className="" name="from" value={from} onChange={e => onChange(e)}/>
            
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" className="" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
            
          </div>
        </div>

        <div className="form_right">
          
          <div className="form-group">
            <textarea 
              type="text" 
              className="" 
              placeholder="JobDescription" 
              name="description" 
              value={description}
              cols="30"
              rows="5"
              onChange={e => onChange(e)}>
              </textarea>
            
          </div>
          </div>
          <div className="form-submit">
            <button type="submit">Submit</button>
          </div>
      </form>      
    </React.Fragment>
  );
}

export default connect(null, { addExperience })(withRouter(AddExperience));
