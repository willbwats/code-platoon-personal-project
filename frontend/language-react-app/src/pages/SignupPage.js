import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, makeProfile } from '../UserAPI';

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
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <label>UserName:</label>
        <input type='text' placeholder='username' name='username' />
        <label>First name:</label>
        <input type='text' name='first' />
        <label>Last name:</label>
        <input type='text' name='last' />
        <label>Password:</label>
        <input type='password' name='password' />
        <label>Native Language:</label>
        <input type='text' name='native' />
        <label>Language you are learning:</label>
        <input type='text' name='learning' />
        <button type='submit' >Sign Up</button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;