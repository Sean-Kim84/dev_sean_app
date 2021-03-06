import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = (props) => {
  const [formData, setFormData] = useState({
    company:"",
    location:"",
    website:"",
    status:"",
    skills:"",
    githubusername:"",
    bio:"",
    social: {
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: ""
    }
  });

  const [ displaySocialInputs, toggleSocialInputs ] = useState(false);

  const {     
    company,
    website,
    status,
    skills,
    location,
    githubusername,
    bio,
   
      twitter,
      youtube,
      instagram,
      facebook,
      linkedin
   } = formData;

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    props.createProfile(formData, props.history)
  }

  return (
    <React.Fragment>
      <div className="form_title">
        <h1>Create Your Profile</h1>
        <p>
          <i className="fas fa-user-alt" />
          Let's get some information to make your profile stand out
        </p>
      </div>
      <form className="form_container" onSubmit={e => onSubmit(e)}>
        <div className="form_left">
          <div className="form-group">
            <select name="status" value={status} onChange={e => onChange(e)}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor or Teacher">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small>Give us an idea of where you are at in your career</small>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Company" name="company" value={company} onChange={e => onChange(e)}/>
            <small>Could be  your own company or one you work for</small>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
            <small>Could be  your own company website</small>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
            <small>City & state suggested  (eg. Boston, MA)</small>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
            <small>Please use comma seperated values (eg. HTML,CSS,JAVASCRIPT,PHP)</small>
          </div>
          <div className="form-group">
            <input type="text" className="" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e => onChange(e)}/>
            <small>If you want your latest repos and a Github link, include your username</small>
          </div>
        </div>

        <div className="form_right">
          <div className="form-group">
            <textarea type="text" className="" placeholder="Bio" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
            <small>Tell us a little about yourself</small>
          </div>
          <button className="option-button" type="button" onClick={() => toggleSocialInputs(!displaySocialInputs)}>Optional</button>  
            
          {displaySocialInputs && 
          <React.Fragment>
            <div className="option-group">
              <i className="fab fa-twitter-square"/>
              <input type="text" className="" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
            </div>

            <div className="option-group">
              <i className="fab fa-facebook-square" />
              <input type="text" className="" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
            </div>

            <div className="option-group">
              <i className="fab fa-youtube-square" />
              <input type="text" className="" placeholder="Youtube URL" name="youtube" value={youtube} onChange={e => onChange(e)}/>
            </div>

            <div className="option-group">
              <i className="fab fa-linkedin" />
              <input type="text" className="" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
            </div>

            <div className="option-group">
              <i className="fab fa-instagram" />
              <input type="text" className="" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
            </div>
          </React.Fragment>}
          </div>
          <div className="form-submit">
            <button type="submit">Submit</button>
          </div>
      </form>      
    </React.Fragment>
  );
}

export default connect(null, { createProfile })(withRouter(CreateProfile));
