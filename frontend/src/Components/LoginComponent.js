import React, { useEffect, useState } from 'react';
import '../Styles/Login.css';
import { axiosInstance } from '../util/baseurl';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setmessage] = useState(null);
  const [buttonText, setButtonText] = useState("Submit");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;

      if (email && password) {
        const response = await axiosInstance.post('/api/auth/login', {
          email,
          password
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data.message);

          localStorage.setItem('token', data.token);
          localStorage.setItem('userEmail', data.useremail);

          setFormData({
            email: '',
            password: '',
          });

          setmessage(data.message);
          setButtonText("Redirecting...");

          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
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

  return (
    <div className="maincontainer">
      <div className='logincontainer'>
        <div className='logintitle'>
          <h1 className='loginheading'>Login</h1>
        </div>
        <div className='divisioncontainer'>
          <div className='formoneside'>
            <div className='formonesideinfo'>
              <h1 className='hirestyle'>Hire<p className='instyle'>Link</p></h1>
              <p>Welcome aboard to Hire and Connect People</p>
              <p>{message}</p>
            </div>
          </div>
          <div className="formsecondside">
            <form onSubmit={handlesubmit} className='loginform'>
              <label className='emaillabel'>Email</label>
              <input
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label className='passwordlabel'>Password</label>
              <input
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button className="loginbutton" type='submit'>{buttonText}</button>
            </form>
            <div className='bottomend'>
              <span>Don't have an account?</span><br /><a href="/">Signup</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;