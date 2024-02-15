// // Registration.js
import React, { useState } from 'react';
import "./style.css"
import ValidateInputs from '../Funtions/ValidateInputs'; // Corrected typo in import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => { // Removed async from function definition
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ValidateInputs({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        email: email
      });

      // Assuming your registration logic here...

      const loginResponse = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
        }),
      });

      const loginResponseData = await loginResponse.json();
      console.log(loginResponseData)

      if (loginResponse.ok) {
        // Clear the form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Handle login logic
        
        const token = loginResponseData.token;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        // localStorage.setItem('isLoggedIn', );
        

        // Display a success message
        toast.success('Registration Successful');
        navigate('/');
        // Redirect to the home page
        
      } else {
        // Handle unsuccessful login (if needed)
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };


  return (
    <div className='registration-form'>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" id="button">Register</button>
      </form>
      <span>
        Already Have an Account?{' '}
        <Link to="/login">Click Here</Link>
      </span>
      <ToastContainer />
    </div>
  );
};

export default Register;

// import React, { useState } from 'react';
// import "./style.css"
// import ValidateInputs from '../Funtions/ValidateInputs';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const[confirmPassword, setConfirmPassword] = useState('');
//     const navigate= useNavigate()
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           await ValidateInputs({
//             username: username,
//             password: password,
//             confirmPassword: confirmPassword,
//             email: email
//           });
      
//           // Clear the fields only if the promise is resolved
//           toast.success('User Created Successfully');
//           localStorage.setItem('password', password);
//           localStorage.setItem('email', email);
//           localStorage.setItem('username', username);
//           setUsername('');
//           setEmail('');
//           setPassword('');
//           setConfirmPassword('');
         
//           navigate('/login')
//         } catch (err) {
//           console.error(err);
//         }
//       };
      

//   return (
//     <div className='registration-form'>
//       <h2>Registration Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Confirm Password:
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>

//         <button type="submit" id="button">Register</button>
//       </form>
//       <span>
//         Already Have an Account?{' '}
//         <Link to="/login">Click Here</Link>
//       </span>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Register;
