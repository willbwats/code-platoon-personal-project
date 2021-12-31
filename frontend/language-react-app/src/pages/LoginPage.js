import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from "../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";
import CustomInput from '../assets/jss/material-kit-pro-react/components/CustomInput/CustomInput.js';
import GridContainer from 'assets/jss/material-kit-pro-react/components/Grid/GridContainer.js';
import GridItem from '../assets/jss/material-kit-pro-react/components/Grid/GridItem.js';

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
      <br/>
    <h1>Login</h1>
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
          <GridContainer>
          <GridItem>
        <span>Need an account? </span> 
        <Link to='/signup'>Signup</Link>
          </GridItem>
              <GridItem sm={12} md={5}>
                  <br/>
                <p>These tools are available without an account:</p>
              </GridItem>
              <GridItem>
                <div><Link to='/resources'>Find a book</Link></div>
                <div><Link to='/translate'>Translate</Link></div>
              </GridItem>
          </GridContainer>
      </div>
  );
};

export default Login;