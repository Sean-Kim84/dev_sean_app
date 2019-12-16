import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../config';

const Register = () => { 
  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    password: '',
    password2: ''
  }));

  const { name, email, password, password2 } = formData;

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if(password !== password2) {
      console.log('password do not match')
    } else {
      const newUser = {
        name, email, password
      } 
      try {
        const config = {
          headers: {
            'Content-Type':"application/json"
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post(`${API}/auth/signup`, body, config);
        console.log(res)
      } catch(err){
        console.error(err.response.data)
      }
      
    }
  }

  return (
    <React.Fragment> 
      <div className="form_container">
      <div className="form_inner">
        <h1>Register</h1>
        <form className="form" onSubmit={e=> onSubmit(e)}>
          <div className="form_input">
            <label>name</label>
            <input type="text" name="name" value={name} placeholder="Name" onChange={(e) => onChange(e)}/>
          </div>
          
          <div className="form_input">
            <label>email</label>
            <input type="text" name="email" value={email} placeholder="Email" onChange={(e) => onChange(e)}/>
          </div>
          
          <div className="form_input">
            <label>password</label>
            <input type="password" name="password" value={password} placeholder="Password" onChange={(e)=> onChange(e)} minLength="6" />
          </div>
          
          <div className="form_input">
            <label>password check</label>
            <input type="password" name="password2" value={password2} placeholder="Chech the Password" onChange={(e) => onChange(e)} minLength="6" />
          </div>   
          <button>Register</button>
        </form>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Register;
