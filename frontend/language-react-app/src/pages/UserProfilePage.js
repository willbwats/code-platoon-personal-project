import React from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../components/UserProfile';


const UserProfilePage = ({ isLoggedIn }, props) => {
    console.log(localStorage.getItem("auth-user"));
    return(
        <div>
            {
                !isLoggedIn
                ?
                <div>
                  <div>
                    <p>You must be logged in to view profiles.</p>
                    <Link to='/login'>Login</Link>
                  </div>
                  <div>
                    <Link to='/signup'>Signup</Link>
                  </div>
                </div>
                :
                <UserProfile token={localStorage.getItem("auth-user")} />
              }

        </div>

    )
}

export default UserProfilePage;