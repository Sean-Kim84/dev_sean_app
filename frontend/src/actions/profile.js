import axios from 'axios';
import { API } from '../config';
import {
  GET_PROFILE,
  GET_PROFILES, 
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_REPOS
} from './types';
import { setAlert } from './alert';

// Get current User profile
export const getCurrentProfile = () => async (dispatch) => {
  try { 
    const res = await axios.get(`${API}/profile/me`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    
  } catch(err){
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update Profile
export const createProfile = (formData, history, edit=false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`${API}/profile`, formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", 'success'));

    if(!edit){
      history.push('/dashboard');
    }

  } catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    });
  }
};
// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`${API}/profile/experience`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
    

  } catch(err){
    const errors = err.response.data.errors;
    console.log(err);
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    dispatch({
      type:PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  };
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put(`${API}/profile/education`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard')


  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${API}/profile/experience/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Experience Removed', 'success'));
  } catch(err){ 
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${API}/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Delete Account & Profile
export const deleteAccount = () => async (dispatch) => {
  if(window.confirm('Are you sure? This can not be undone')){
    try {
      const res = await axios.delete(`${API}/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(setAlert('Your account has been permanantly deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    };
  };
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  try  {
    const res = await axios.get(`${API}/profile`);
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch(err){
    console.log(err.response)
      dispatch({
        type: PROFILE_ERROR,
        
      });
  };
};

// Get user profiles
export const getProfileById = (userId) => async (dispatch) => {
  
  try {
    const res = await axios.get(`${API}/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.status
      }
    })
  }
};

// Get github repos
export const getGithubRepos = (username) => async (dispatch) => {

  try {
    const res = await (`${API}/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.status
      }
    });
  };
};

