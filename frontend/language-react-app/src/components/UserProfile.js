import {useParams} from "react-router-dom";
import { getProfileByID, getUserByID } from '../UserAPI';
import { useEffect, useState, useContext } from 'react';
import GridItem from "../assets/jss/material-kit-pro-react/components/Grid/GridItem.js";
import GridContainer from "../assets/jss/material-kit-pro-react/components/Grid/GridContainer.js";
import Button from '../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js';

const UserProfile = ({ token }, props) => {

    let { id } = useParams();
    const [profileObj, setProfileObj] = useState(null);

    useEffect(()=>{
        const getProfile = async () => {
            let data = await getProfileByID(id, token);
            let converted_data = await data.json();
            console.log(converted_data);
            setProfileObj(converted_data);
        };
        if(profileObj === null) {
             getProfile(); 
        };
    }, [profileObj, id, token])

    return(

        <div>
            <GridContainer
                alignItems="center"
                justify="center">
                <GridItem className="profile-username">
                    <h1>{profileObj && profileObj.first_name} {profileObj && profileObj.last_name}'s Profile</h1>
                </GridItem>
                <GridItem className="profile-join-date">
                    Member since {profileObj && profileObj.creation_date}
                </GridItem>
                <GridItem className="profile-native-lang">
                    <h5>Native language: {profileObj && profileObj.native_language}</h5>
                </GridItem>
                <GridItem className="profile-learning-lang">
                    Learning: {profileObj && profileObj.language_learning}
                </GridItem>
                <GridItem>
                    <h3>About {profileObj && profileObj.first_name}</h3>
                    {profileObj && profileObj.biography === '' ? <p>{profileObj && profileObj.first_name} has not added a biography yet!</p> : <p>{profileObj && profileObj.biography}</p>}
                </GridItem>
                <GridItem>
                    <h3>{profileObj && profileObj.first_name}'s Friends</h3>
                    {profileObj && profileObj.friends.length === 0 ? <p>{profileObj && profileObj.first_name} has not added any friends yet!</p> : <p>friends to show</p>}
                </GridItem>
                <GridItem>
                    <Button color="primary">Send Friend Request</Button>
                </GridItem>
                <GridItem>
                   <h3>Discord username</h3>
                   {profileObj && profileObj.discord_name === '' ? <p>{profileObj && profileObj.first_name} has not added their discord yet.</p> : <p>{profileObj && profileObj.discord_name}</p>}
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default UserProfile;