import React from 'react';
import GridItem from "../assets/jss/material-kit-pro-react/components/Grid/GridItem.js";
import GridContainer from "../assets/jss/material-kit-pro-react/components/Grid/GridContainer.js";
import CustomInput from '../assets/jss/material-kit-pro-react/components/CustomInput/CustomInput.js';
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import styles from "assets/jss/material-kit-pro-react/customSelectStyle.js";
import Select from "@material-ui/core/Select";
import Button from '../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js';
import Translate from '@material-ui/icons/Translate';

const useStyles = makeStyles(styles);

function TranslationInputArea() {
    const [languageFromSelect, setlanguageFromSelect] = React.useState("");
    const [languageToSelect, setlanguageToSelect] = React.useState("");
    const [translationText, setTranslationText] = React.useState("Translation");
    
    // Language select handlers
    const handleLanguageFrom = event => {
        setlanguageFromSelect(event.target.value);
    };
    
    const handleLanguageTo = event => {
        setlanguageToSelect(event.target.value);
    };
    
    const classes = useStyles();
    
    return (
      <div className="translate-input-area">
        <GridContainer>
        <GridItem xs={12} sm={8} md={4} lg={4}>
            <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
                htmlFor="language-from-select"
                className={classes.selectLabel}
            >
                Translate From
            </InputLabel>
            <Select
                MenuProps={{
                className: classes.selectMenu
                }}
                classes={{
                select: classes.select
                }}
                value={languageFromSelect}
                onChange={handleLanguageFrom}
                inputProps={{
                name: "languageFromSelect",
                id: "language-from-select"
                }}
            >
                <MenuItem
                disabled
                classes={{
                    root: classes.selectMenuItem
                }}
                >
                Select a language
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="2"
                >
                English
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="3"
                >
                Spanish
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="4"
                >
                German
                </MenuItem>
            </Select>
            </FormControl>

            <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
                htmlFor="language-from-select"
                className={classes.selectLabel}
            >
                Translate To
            </InputLabel>
            <Select
                MenuProps={{
                className: classes.selectMenu
                }}
                classes={{
                select: classes.select
                }}
                value={languageToSelect}
                onChange={handleLanguageTo}
                inputProps={{
                name: "languageToSelect",
                id: "language-to-select"
                }}
            >
                <MenuItem
                disabled
                classes={{
                    root: classes.selectMenuItem
                }}
                >
                Select a target language
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="2"
                >
                English
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="3"
                >
                Spanish
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="4"
                >
                German
                </MenuItem>
            </Select>
            </FormControl>

        </GridItem>

        

        {/* ------------ INPUT TEXT FOR TRANSLATION ---------------- */}
          <GridItem xs={12} sm={8} md={4}>
                <CustomInput
                    labelText="Input Text"
                    id="float"
                    formControlProps={{
                    fullWidth: true
                    }}
                    
                />
                <Button color="primary" round><Translate />Translate</Button>
            </GridItem>

            <GridItem xs={12} sm={6} md={4} lg={4}>
                <h3>Translation</h3><br/>
                <h5>{translationText}</h5>
            </GridItem>


        </GridContainer>
      </div>
    );
  }
  
  export default TranslationInputArea;