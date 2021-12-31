import {useParams} from "react-router-dom";
import { getProfileByID, setBio, setDiscord } from '../UserAPI';
import { useEffect, useState, useContext } from 'react';
import React from "react";
import GridItem from "../assets/jss/material-kit-pro-react/components/Grid/GridItem.js";
import GridContainer from "../assets/jss/material-kit-pro-react/components/Grid/GridContainer.js";
import Button from '../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js';
import UserContext from '../contexts/UserContext.js';
import style from "../assets/jss/material-kit-pro-react/modalStyle.js";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@mui/material/TextField';
import PhoneIcon from '@mui/icons-material/Phone';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const useStyles = makeStyles(style);

const UserProfile = ({ token }, props) => {

    let { id } = useParams();
    const [profileObj, setProfileObj] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const userContext = useContext(UserContext);
    const { user } = userContext;
    const [editBio, setEditBio] = React.useState(false);
    const [editDiscord, setEditDiscord] = React.useState(false);
    const [newBio, setNewBio] = React.useState("")
    const [newDiscord, setNewDiscord] = React.useState("")
    const classes = useStyles();

    useEffect(()=>{
        const getProfile = async () => {
            setIsOwnProfile(false);
            let data = await getProfileByID(id, token);
            let converted_data = await data.json();
            console.log(converted_data);
            setProfileObj(converted_data);

        };
        if(profileObj === null) {
             getProfile();
        };
        //check if user is looking at their own profile
        if (profileObj !== null) {
            if(profileObj['id'] == user['profile']) {
                console.log("User is looking at their own profile");
                setIsOwnProfile(true);
        } else {
            console.log("User is looking at someone else's profile");
            setIsOwnProfile(false);
        }}
    }, [profileObj, id, token])

    const reload=()=>window.location.reload();
    
    //handlers for edit modals
    const handleEditDiscordButtonClicked = () => {
        console.log("Edit discord button clicked");
        setEditDiscord(true);
    }
    const handleEditBiographyButtonClicked = () => {
        console.log("Edit bio button clicked");
        setEditBio(true);
    };

    const handleEditDiscordSaveButtonClicked = () => {
        console.log("Save new discord button clicked");
        console.log("text field currently says ", {newDiscord})
        setDiscord(profileObj['id'], token, newDiscord);

    }

    const handleEditBioSaveButtonClicked = () => {
        console.log("Save new bio button clicked");
        console.log("text field currently says ", {newBio})
        setBio(profileObj['id'], token, newBio);

    }

    const newBioInputChanged = event => {
        setNewBio(event.target.value);
    }

    const newDiscordInputChanged = event => {
        setNewDiscord(event.target.value);
    }

    const handleEditBioModalClosed = () => {
        setEditBio(false);
        reload();
    }

    const handleEditDiscordModalClosed = () => {
        setEditDiscord(false);
        reload();
    }


    return(

        <div>
            {/* ---- Edit biography modal ---- */}

      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={editBio}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setEditBio(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setEditBio(false)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Edit About Me</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <TextField
           inputProps={{

            onChange: newBioInputChanged,
            }}
            id="standard-multiline-static"
 
            multiline
            // rows={4}
            defaultValue={profileObj ? profileObj.biography : ""}
            fullWidth="true"
        />
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => handleEditBioModalClosed()} color="secondary">
            Close
          </Button>
          <Button onClick={()=>{handleEditBioSaveButtonClicked()}}color="primary">Save changes</Button>
        </DialogActions>
      </Dialog>
        {/* ------------   end of edit bio modal ------------   */}

{/* ---- Edit discord modal ---- */}

<Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={editDiscord}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setEditDiscord(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setEditDiscord(false)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Edit Discord</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <TextField
           inputProps={{

            onChange: newDiscordInputChanged,
            }}
            id="standard-multiline-static"
 
            multiline
            // rows={4}
            defaultValue={profileObj ? profileObj.discord_name : ""}
            fullWidth="true"
        />
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => handleEditDiscordModalClosed()} color="secondary">
            Close
          </Button>
          <Button onClick={()=>{handleEditDiscordSaveButtonClicked()}}color="primary">Save changes</Button>
        </DialogActions>
      </Dialog>
        {/* ------------   end of edit discord modal ------------   */}

            <GridContainer
                alignItems="center"
                justify="center">
                <GridItem className="profile-username">
                    <h1>{profileObj && profileObj.first_name} {profileObj && profileObj.last_name}</h1>
                    <hr/>
                </GridItem>
                <GridItem className="profile-join-date">
                    Member since {profileObj && profileObj.creation_date}
                </GridItem>
                <GridItem  className="profile-native-lang">
                    <h3>Native language: {profileObj && profileObj.native_language}</h3>
                    <h3>Learning: {profileObj && profileObj.language_learning}</h3>
                <hr/>
                </GridItem>
                <GridItem className="profile-about-section">
                    <h3>About {profileObj && profileObj.first_name} {isOwnProfile &&  <Button className="edit-button" onClick={()=>{handleEditBiographyButtonClicked()}}color="primary" size="sm">edit</Button>}</h3>
                    {profileObj && profileObj.biography === '' ? <p>{profileObj && profileObj.first_name} has not added a biography yet!</p> : <p>{profileObj && profileObj.biography}</p>}
                </GridItem>
                <GridItem>
                    <h3>Friends</h3>
                    {profileObj && profileObj.friends.length === 0 ? <p>{profileObj && profileObj.first_name} has not added any friends yet!</p> : <ul>{profileObj && profileObj.friends.map((friend, idx) => <li>{friend}</li>)}</ul>}
                    
                </GridItem>
                <GridItem>
                    {/* <Button color="primary">Send Friend Request</Button> */}
                </GridItem>
                <GridItem>
                   <h3>Discord username <PhoneIcon color="info"/>{isOwnProfile &&  <Button className="edit-button" onClick={()=>{handleEditDiscordButtonClicked()}}color="primary" size="sm">edit</Button>}</h3>
                   {profileObj && profileObj.discord_name === '' ? <p>{profileObj && profileObj.first_name} has not added their discord yet.</p> : <p>{profileObj && profileObj.discord_name}</p>}
                <hr/>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default UserProfile;