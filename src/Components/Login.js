import React, { useEffect, useState } from 'react';
import "./style.css"
import ValidateLoginInputs from '../Funtions/ValidateLoginInputs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the token exists in localStorage
  
    if (localStorage.getItem("token")) {
      // Navigate to the home route
      navigate("/");
    }
    else{
      navigate("/login");
    }
    
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', true);
    // Validate inputs
    try {
      await ValidateLoginInputs({ password, username });
      navigate("/");
    } catch (validationError) {
      setError(validationError);
      return;
    }

   
  };

  return (
    <div className='login-form'>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" id="button">Login</button>
      </form>
      <span>
        Don't you Have an Account?{' '}
        <Link to="/register">Click Here</Link>
      </span>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default Login;


// try {
     
//   const response = await fetch('https://dummyjson.com/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       username: 'kminchelle',
//       password: '0lelplR',
//     }),
//   });

 
//   const response1 = await response.json();

  
//   if (response.ok) {
//     setError('');
    
    
//     const token = response1.token;
//     localStorage.setItem('token', token);

//     // Update the login status
//     navigate('/');
//     localStorage.setItem('isLoggedIn', true);

//     // Clear the form fields
//     setusername('');
//     setPassword('');

//     // Display a success message
//     toast.success('Login Successfully');

//     // Redirect to the home page
   
//   } else {
//     setError('Invalid credentials. Please try again.');
//   }
// } catch (err) {
//   console.error('Login failed:', err);
//   setError('An unexpected error occurred. Please try again later.');
// }