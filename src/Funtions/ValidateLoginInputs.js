import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ValidateLoginInputs = ({ password, username }) => {
  return new Promise((resolve, reject) => {
   
    const storedUsername = localStorage.getItem('username');
    // const storedEmail = localStorage.getItem('email');

    if (storedUsername !== username) {
      toast.error('User Does not Exists');
      reject('User Does not Exists');
      return;
    }

    // Validate password
    if (!password ) {
      toast.error('Password Required');
      
      return;
    }
    if(password !== localStorage.getItem('password')){
      toast.error('Password is incorrect');
    }

    // All validations passed, resolve the promise
    resolve();
  });
};

export default ValidateLoginInputs;
