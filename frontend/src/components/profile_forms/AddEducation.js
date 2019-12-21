import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    title:'',
    fieldofstudy:'',
    from: '',
    to: '',
    current: false,
    description: '' 
  });
  
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { school, degree, fieldofstudy,location, from, to, current, description } = formData;
  
  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value}) 
  }

  return (
    <React.Fragment>
      <div className="form_title">
        <h1>Add Your Education</h1>
        <p>
          <i className="fas fa-user-alt" />
          Add any school or bootcamp that you have attended
        </p>
      </div>
      <form className="form_container" onSubmit={e => {
        e.preventDefault();
        addEducation(formData, history);
      }  
      }>
        <div className="form_left">
          <div className="form-group">
            <input type="text" className="" placeholder="* School" name="school" value={school} onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Degree" name="degree" value={degree} onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)}/>
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
                name="current" 
                checked={current}
                value={current} 
                onChange={e => {
                  setFormData({...formData, current: !current})
                  toggleDisabled(!toDateDisabled);
                }
              }/>
              Current Student{` `}
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
              placeholder="Education Description" 
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

export default connect(null, { addEducation })(withRouter(AddEducation));
