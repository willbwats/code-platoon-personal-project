import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, makeProfile } from '../UserAPI';
import CustomInput from '../assets/jss/material-kit-pro-react/components/CustomInput/CustomInput.js';
import Button from "../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";

const SignupPage = (props) => {
  let navigate = useNavigate();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }

    
    let response = await signupUser(userObject);
    let data = await response.json();

    let profileObject = {
        "user": data.id,
        "friends": [],
        "first_name": evt.target.first.value,
        "last_name": evt.target.last.value,
        "native_language": evt.target.native.value,
        "language_learning": evt.target.learning.value,
        "discord_name": "",
        "biography": "",
    }
    console.log(data);
    if (data.error) {
      console.log('there was an error signing up');
    } else {
        makeProfile(profileObject, data.token);
        navigate('/login');
    }

  }

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSignup}>
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
            labeltext="First name"
            inputProps={{
              placeholder: "First Name"
            }}
            formControlProps={{
              fullWidth: true
            }}
            id='first'
            name='first' />
        <CustomInput 
            labeltext="Last name"
            inputProps={{
              placeholder: "Last Name"
            }}
            formControlProps={{
              fullWidth: true
            }}
            id='last'
            name='last' />
        <CustomInput 
            labeltext="Password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
                placeholder: "Password",
                type: "password"
              }}
              id='password'
            name='password' 
            type='password'/>
        <h2>About you</h2>
        <h5>What is your native language?</h5>
        <CustomInput 
            labeltext="Native Language"
            inputProps={{
              placeholder: "Native Language"
            }}
            formControlProps={{
              fullWidth: true
            }}
            id='native'
            name='native' />
        <h5>What language are you learning?</h5>
        <CustomInput 
            labeltext="What is your target language?"
            inputProps={{
              placeholder: "Target Language"
            }}
            formControlProps={{
              fullWidth: true
            }}
            id='learning'
            name='learning' />
        <Button color='primary' type='submit' >Sign Up</Button>
      </form>
    </div>
  );
};

export default SignupPage;