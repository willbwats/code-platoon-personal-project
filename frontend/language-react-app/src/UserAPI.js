

const login = (userObject) => {
    return fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }).then(res => res)
  };
  
  const getLoggedInUser = (token) => {
    return fetch('http://localhost:8000/core/current_user/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }).then(res => res)
  };
 

  const signupUser = (userObject) => {
    return fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }).then(res => res)
  };

  const getProfileByID = async (id, token) => {
    return fetch(`http://localhost:8000/api/profile/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        }
      }).then(res => res)
    };

    const getAllProfiles = async (token) => {
        return fetch(`http://localhost:8000/api/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        }
      }).then(res => res)
    };

    const getUserByID = async (id, token) => {
        return fetch(`http://localhost:8000/api/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
            }
            }).then(res => res)
        };

  const makeProfile = async (profileObject, token) => {
    return fetch('http://localhost:8000/api/profile/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      },
      body: JSON.stringify(profileObject)
    }).then(res => res)
  };

    const setBio = async(profile_id, token, newBioText) => {
        let biographyObj = {'biography': newBioText}
        console.log("calling API to change bio");
        return fetch(`http://localhost:8000/api/profile/${profile_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
      },
      body: JSON.stringify(biographyObj)
    }).then(res => res)
    }

    const setDiscord = async(profile_id, token, newDiscordText) => {
        let discordObj = {'discord_name': newDiscordText}
        console.log("calling API to change discord");
        return fetch(`http://localhost:8000/api/profile/${profile_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
      },
      body: JSON.stringify(discordObj)
    }).then(res => res)
    }
  export { getAllProfiles, login, getLoggedInUser, signupUser, makeProfile, getProfileByID, getUserByID, setBio, setDiscord }
  