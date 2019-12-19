import axios from 'axios';
import { API } from '../config';
import { loadUser } from './auth'
import { GET_PROFILE, PROFILE_ERROR } from './types';

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