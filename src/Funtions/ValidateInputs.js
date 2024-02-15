import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ValidateInputs = ({ username, password, confirmPassword, email }) => {
  return new Promise((resolve, reject) => {
    // Validate username
    if (!username || typeof username !== 'string' || username.trim() === '') {
      toast.error('Username is required');
    //   reject('Username is required');
      return;
    }
    if(username.length <3 ){
        toast.error('Username must be at least 3 characters');
        return ;
    }

    // Validate password
    if (!password || password.length < 5) {
      toast.error('Password must be at least 5 characters');
    //   reject();
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
     
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      toast.error('Invalid email address');
      
      return;
    }

    // All validations passed, resolve the promise
    resolve();
  });
};

export default ValidateInputs;
