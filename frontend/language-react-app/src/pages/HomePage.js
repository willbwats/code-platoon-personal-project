import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
//materialui
// core components
import InfoArea from "../assets/jss/material-kit-pro-react/components/InfoArea/InfoArea.js";
import Table from "../assets/jss/material-kit-pro-react/components/Table/Table.js";
import Button from "../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons
import Translate from '@material-ui/icons/Translate';
import PublicIcon from '@mui/icons-material/Public';
import Person from "@material-ui/icons/Person";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
//API
import { getAllProfiles } from '../UserAPI';
import GridItem from '../assets/jss/material-kit-pro-react/components/Grid/GridItem.js';
import GridContainer from 'assets/jss/material-kit-pro-react/components/Grid/GridContainer.js';

const useStyles = makeStyles(style);


const HomePage = ({ isLoggedIn, handleLogout }) => {

  const userContext = useContext(UserContext);
  const { user } = userContext;
  // const [profiles, setProfiles] = useState(null);
  const [mapped_profiles, setMappedProfiles] = useState(null);
  const token= localStorage.getItem("auth-user");
  
      //materialui
      const classes = useStyles();
      const simpleButtons = [
        { color: "info", icon: Person },
        { color: "success", icon: PersonAddIcon }
      ].map((prop, key) => {
        return (
          <Button simple justIcon size="md" color={prop.color} key={key}>
            <prop.icon />
          </Button>
        );
      });

  useEffect(()=>{
    const getProfiles = async () => {
        let profilesData = await getAllProfiles(token);
        let converted_data = await profilesData.json();
        console.log(converted_data);
        // setProfiles(converted_data);
        
        if(converted_data !== null) {
          let new_mapped_profiles = [];
          for(let i=0; i<converted_data.length; i++) {
            new_mapped_profiles.push([converted_data[i]['first_name'], converted_data[i]['language_learning'], converted_data[i]['native_language'], converted_data[i]['creation_date'], <Link to={`user/${converted_data[i]['id']}/`}><Button size="sm" color="primary">View Profile</Button></Link>])
          };
          console.log("new mapped profiles", new_mapped_profiles);
          setMappedProfiles(new_mapped_profiles);}
      };
      if(mapped_profiles === null) {
        getProfiles(); 
      };
      
    }, [mapped_profiles, token])

    

  return (
    // ------------ HOME PAGE FOR LOGGED IN USER --------------
    <div>
      {
        user && mapped_profiles &&
        <div>
        <GridContainer className="homepage-header">
          <GridItem xs={12} md={4} lg={6}>
          <h1>Language Exchange</h1>
          <p>Our website is dedicated to improving the experience of foreign language learners. Our goal is to provide you the tools necessary to learn a language in one place, and connect you with native speakers of your target language.</p>
          <p>Our platform will always remain free to use.</p>
          </GridItem>
          <GridItem xs={12} md={4} lg={6}>
            <img width="400px" src="https://bator.io/assets/img/graphics/bator/100.svg" alt="language exchange"/>
          </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem md={5} lg={4}>
            <InfoArea
                  title="Find resources"
                  description="Use our book finder tool to search for books in the Open Library"
                  icon={MenuBookIcon}
                  iconColor="primary"
              />
          </GridItem>
          <GridItem md={5} lg={4}>
              <InfoArea
                  title="Discover Vocabulary"
                  description="Use our translation tool to discover new words in your target language."
                  icon={Translate}
                  iconColor="primary"
              />
            </GridItem>
            <GridItem md={5} lg={4}>
              <InfoArea
                  title="Find a partner"
                  description="Connect with native speakers of your target language for a better learning experience."
                  icon={PublicIcon}
                  iconColor="primary"
              />
              </GridItem>
          </GridContainer>
          <h2 className="find-a-language-partner">Find a language partner</h2>
          
          <Table className="homepage-learners-table"
      tableHead={["Name", "Learning", "Native Language", "Date Joined", "Profile"]}
      tableData={mapped_profiles}

      customCellClasses={[
        classes.textCenter,
        classes.textCenter,
        classes.textCenter
      ]}
      customClassesForCells={[0, 4, 5]}
      customHeadCellClasses={[
        classes.textCenter,
        classes.textCenter,
        classes.textCenter
      ]}
      customHeadClassesForCells={[0, 4, 5]}
    />


        </div>
      }
      {
        // ---- HOME PAGE FOR NON-USER -----
        !isLoggedIn &&
        <div>
          <Navigate to='/login'/>
        </div>

      }
    </div>
  );
};

export default HomePage;
