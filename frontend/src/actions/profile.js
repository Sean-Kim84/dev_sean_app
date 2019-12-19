import axios from 'axios';
import { API } from '../config';
import { GET_PROFILE, PROFILE_ERROR } from './types';
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

    const res = await axios.post(`${API}/profile/`, formData, config);
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
}