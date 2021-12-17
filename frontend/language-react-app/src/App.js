import Header from './components/Header.js';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.js'
import Translate from './pages/Translate.js'
import Resources from './pages/Resources.js'

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.js";
import Button from "./assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";
import Email from "@material-ui/icons/Email";
import CustomDropdown from "./assets/jss/material-kit-pro-react/components/CustomDropdown/CustomDropdown.js";


const useStyles = makeStyles(navbarsStyle);

function App() {

  const classes = useStyles();

  return (
    <div className="App">
      <BrowserRouter>
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
                      <Button
                        href="/resources"
                        className={classes.navLink}
                        onClick={e => e.preventDefault()}
                        color="transparent"
                      >
                        Find Resources
                      </Button>
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
                    <CustomDropdown
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
                        "My Profile",
                        "Sign out"
                      ]}
                    />
                  </ListItem>
                </List>
            }
            />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/translate" element={<Translate />} />
          <Route exact path="/resources" element={<Resources />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
