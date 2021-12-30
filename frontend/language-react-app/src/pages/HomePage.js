import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
//materialui
// core components
import Table from "../assets/jss/material-kit-pro-react/components/Table/Table.js";
import Button from "../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons
import Person from "@material-ui/icons/Person";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
//API
import { getAllProfiles } from '../UserAPI';

const useStyles = makeStyles(style);


const HomePage = ({ isLoggedIn, handleLogout }) => {

  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [profiles, setProfiles] = useState(null);
  const token= localStorage.getItem("auth-user");

  useEffect(()=>{
    const getProfiles = async () => {
        let profilesData = await getAllProfiles(token);
        let converted_data = await profilesData.json();
        console.log(converted_data);
        setProfiles(converted_data);
    };
    if(profiles === null) {
          getProfiles(); 
    };
  }, [profiles, token])


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


  return (
    <div>
      <h1>Home Page</h1>
      {
        user &&
        <div>
          <div>
            Hi {user.username}
          </div>
          <Table
      tableHead={["Name", "Learning", "Native Language", "Discord Username", "Actions"]}
      tableData={[
        ["Andrew Mike", "Develop", "2013", "€ 99,225", simpleButtons],
        ["John Doe", "Design", "2012", "€ 89,241", simpleButtons],
        ["Alex Mike", "Design", "2010", "€ 92,144", simpleButtons]
      ]}
      customCellClasses={[
        classes.textCenter,
        classes.textRight,
        classes.textRight
      ]}
      customClassesForCells={[0, 4, 5]}
      customHeadCellClasses={[
        classes.textCenter,
        classes.textRight,
        classes.textRight
      ]}
      customHeadClassesForCells={[0, 4, 5]}
    />


        </div>
      }
      {
        // ---- HOME PAGE FOR NON-USER -----
        !isLoggedIn
        ?
        <div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
          <div>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
        :
        <button onClick={handleLogout}>Logout</button>
      }
    </div>
  );
};

export default HomePage;
