import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext.js';
import { getLoggedInUser, login } from 'UserAPI';


//pages 
import HomePage from './pages/HomePage.js'
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import Translate from './pages/Translate.js'
import Resources from './pages/Resources.js'

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@mui/material/Avatar';
import Header from './components/Header.js';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.js";
import Button from "./assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";
import Email from "@material-ui/icons/Email";
import CustomDropdown from "./assets/jss/material-kit-pro-react/components/CustomDropdown/CustomDropdown.js";
import UserProfilePage from 'pages/UserProfilePage';
import GridItem from 'assets/jss/material-kit-pro-react/components/Grid/GridItem.js';
import GridContainer from 'assets/jss/material-kit-pro-react/components/Grid/GridContainer.js';
import Card from "assets/jss/material-kit-pro-react/components/Card/Card.js";
import CardBody from "assets/jss/material-kit-pro-react/components/Card/CardBody.js";
import CustomInput from 'assets/jss/material-kit-pro-react/components/CustomInput/CustomInput.js';
import InputAdornment from "@material-ui/core/InputAdornment";
import Mail from "@material-ui/icons/Mail";

const useStyles = makeStyles(navbarsStyle);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ userInitials, setUserInitials ] = useState("User");
  const [error, setError] = useState(null);
  const classes = useStyles();


  console.log("USER: ", user)
  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        if (data.username) {
          console.log(data.username);
          setIsLoggedIn(true);
          setUser(data);
          setUserInitials(data.username[0]);
        }
      }
    }
    if (!user) {
      getUser();
    }
  }, [user])

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  }

  const handleMyProfileClicked = () => {
    return <Navigate to={`user/${user.profile}`} />

  }

  return (
    <div className="App">
      
      <BrowserRouter>
      <UserContext.Provider value={{ user: user, setUser: handleLogin, error: error }}>

        {/* ---------------  NAV BAR ----------------- */}
          <Header 
            brand="Language Exchange"
            color="primary"
            links= {
                <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Link to="/translate" style={{padding: 0}} className={classes.navLink} color="transparent">
                        <Button color="transparent">Translate</Button>
                    </Link>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Link to="/resources" style={{padding: 0}} className={classes.navLink} color="transparent">
                        <Button color="transparent">Find Resources</Button>
                    </Link>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.notificationNavLink}
                      onClick={e => e.preventDefault()}
                      // make rose only if they have notifications
                      // otherwise transparent
                      color="transparent"
                      justIcon
                      round
                    >
                      <Email />
                    </Button>
                  </ListItem>
                  
                  <ListItem className={classes.listItem}>
                    {isLoggedIn ? <CustomDropdown
                      left
                      caret={false}
                      hoverColor="dark"
                      dropdownHeader="Choose an option"
                      buttonText={
                        <Avatar sx={{ bgcolor: 'darkblue' }}>{user ? user.username[0] : ""}</Avatar>}
                       
                      
                      buttonProps={{
                        className:
                          classes.navLink + " " + classes.imageDropdownButton,
                        color: "transparent"
                      }}
                      dropdownList={[
                        <Link onClick={() => handleMyProfileClicked()} to={user && `user/${user.profile}/`}>My Profile</Link>,
                        <Link to="/" onClick={() => handleLogout()}>Sign out</Link>
                      ]}
                    />
                      // -- Nav bar profile image when user is not logged in ----
                    : <CustomDropdown
                      left
                      caret={false}
                      hoverColor="dark"
                      dropdownHeader="Choose an option"
                      buttonText={
                        <img
                          src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                          className={classes.img}
                          alt="profile"
                        />
                      }
                      buttonProps={{
                        className:
                          classes.navLink + " " + classes.imageDropdownButton,
                        color: "transparent"
                      }}
                      dropdownList={[
                        <Link to="/signup">Sign up</Link>,
                        <Link to="/login">Sign in</Link>
                      ]}
                    />}
                    
                  </ListItem>
                </List>
            }
            />

            {/* ---------------    END OF NAV BAR ----------------- */}
        <div className="main-content-section">
      

          <Routes>
            <Route exact path="/" element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route exact path="/login" element={<LoginPage isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} user={user} />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route exact path="/translate" element={<Translate />} />
            <Route exact path="/resources" element={<Resources />} />
            <Route exact path="/user/:id" element={<UserProfilePage isLoggedIn={isLoggedIn} />} />
          </Routes>
        </div>
        <div id="footer" className={classes.container}>
          <GridContainer backgroundColor="black">
            <GridItem xs={12} sm={6} md={6}>
              <h3 className={classes.title}>Sign up for our word of the day!</h3>
              <p className={classes.description}>
                Join our mailing list and get a new word along with example sentences in your inbox every day! 
              </p>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card plain>
                <CardBody>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6} lg={8}>
                        <CustomInput
                          id="emailPreFooter2"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.formFix
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail />
                              </InputAdornment>
                            ),
                            placeholder: "Your Email..."
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={4}>
                        <Button
                          color="primary"
                          round
                          block
                          className={classes.subscribeButton}
                        >
                          subscribe
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
