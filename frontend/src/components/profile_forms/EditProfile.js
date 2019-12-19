import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ 
  profile: { profile, loading }, 
  createProfile, 
  getCurrentProfile, 
  history }) => {
  const [formData, setFormData] = useState({
    company:"",
    location:"",
    website:"",
    status:"",
    skills:"",
    githubusername:"",
    bio:"",
    twitter:"",
    facebook:"",
    linkedin:"",
    youtube:"",
    instagram:"",
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
    facebook,
    linkedin,
    youtube,
    instagram } = formData;

    useEffect(() => {
      getCurrentProfile();
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(','),
        githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter,
        facebook: loading || !profile.social ? '' : profile.social.facebook,
        linkedin: loading || !profile.social ? '' : profile.social.linkedin,
        youtube: loading || !profile.social ? '' : profile.social.youtube,
        instagram: loading || !profile.social ? '' : profile.social.instagram
      });
    }, [loading])

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true)
  }

  return (
    <React.Fragment>
      <div className="form_title">
        <h1>Edit Your Profile</h1>
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
            <input type="text" className="" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
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
            <button>Submit</button>
          </div>
          <div className="form-back">
            <button type="submit">
              <Link to="/dashboard">Go Back</Link>
            </button>
          </div>
      </form>      
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {
  getCurrentProfile,
  createProfile
})(withRouter(EditProfile));
