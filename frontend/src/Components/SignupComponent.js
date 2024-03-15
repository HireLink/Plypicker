/* Signup.js */

import React, { useEffect, useState } from 'react';
import '../Styles/Signup.css';
import { axiosInstance } from '../util/baseurl';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    accounttype: "",
    password: '',
    confirmPassword: '',
  });

  const [message, setmessage] = useState(null)
  const [checktrue, setCheckTrue] = useState(false)
  const [isValid, setIsValid] = useState(null);

  const handleInputPasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({
      ...formData,
      password: newPassword,
    });

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{5,})$/;
    const isPasswordValid = passwordRegex.test(newPassword);
    setCheckTrue(true)
    setIsValid(isPasswordValid);
  };



  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, accounttype, confirmPassword } = formData;
      if (password !== confirmPassword) {
        setmessage("Password mismatch")
      }
      if (email && password === confirmPassword) {
        const response = await axiosInstance.post('/api/auth/signup', {
          email, password, accounttype
        })
        const data = response.data;
        setFormData({
          email: '',
          accounttype: "",
          password: '',
          confirmPassword: '',
        });
        setmessage(data.message);
      }
    } catch (error) {
      console.log(error.response); // Log the entire error response object

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        setmessage(errorMessage);
      } else {
        // Handle other errors here
        console.log(error);
      }
    }
  };

  useEffect((req, res) => {
    if (message) {
      setTimeout(() => {
        setmessage(null)
      }, 3000);
    }
  })

  useEffect((req, res) => {
    if (checktrue) {
      setTimeout(() => {
        setCheckTrue(null)
      }, 5000);
    }
  })

  return (
    <div className="maincontainer">
      <div className='signupcontainer'>
        <div className='signuptitle'>
          <h1 className='signupheading'>Signup</h1>
        </div>
        <div className='divisioncontainer'>
          <div className='formoneside'>
            <div className='formonesideinfo'>
              <h1 className='hirestyle'>Ply<p className='instyle'>Picker</p></h1>
              <p className='subbrandstyle'>Welcome aboard to Update and Connect People</p>
              {checktrue && (
                isValid ? (
                  <div style={{ color: 'green' }}>Password is strong!</div>
                ) : (
                  <div style={{ color: 'red' }}>
                    Password must contain at least one uppercase letter, one special character (!@#$%^&*), and be at least 5 characters long.
                  </div>
                )
              )}

              <p className='signupmessage'>{message}</p>
            </div>
          </div>
          <div className="formsecondside">
            <form onSubmit={handlesubmit} className='signupform'>
              <label className='emaillabel'>Email</label>
              <input
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label className='statuslabel'>I am</label>
              <select
                value={formData.accounttype}
                onChange={(e) => setFormData({ ...formData, accounttype: e.target.value })}
              >
                <option value="" disabled hidden>Select Account Type</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
              <label className='passwordlabel'>Password</label>
              <input
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputPasswordChange}  // Pass the event object here
                required
              />

              <label className='confirmpasswordlabel'>Confirm Password</label>
              <input
                type='password'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <button className="signupbutton" type='submit'>Submit</button>
            </form>
            <div className='bottomend'>
              <span>Already have an account?</span><br /><a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Signup;
