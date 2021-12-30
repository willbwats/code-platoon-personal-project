import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from "../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";
import CustomInput from '../assets/jss/material-kit-pro-react/components/CustomInput/CustomInput.js';

const Login = ({isLoggedIn, handleLogout, handleLogin}) => {

  if (isLoggedIn) {
    return <div>
      <div>
        <Navigate to='/'/>
      </div>
    </div>
  }

  return (
    <div>
    <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <CustomInput 
            labeltext="Username"
            inputProps={{
              placeholder: "Username"
            }}
            formControlProps={{
              fullWidth: true
            }}
            id='username'
            name='username' />
        <CustomInput 
            labeltext="Password"
            inputProps={{
                type: "password",
              placeholder: "Password"
            }}
            formControlProps={{
              fullWidth: true
            }}
            id='password'
            name='password' />
        <Button color="primary" type='submit' >Login</Button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Login;