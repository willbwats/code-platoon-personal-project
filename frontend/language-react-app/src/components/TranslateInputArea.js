import React, { useState, useEffect } from 'react';
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

    // Text to be translated, inputted by user
    const [inputText, setInputText] = React.useState("");

    // The resulting translation
    const [translationText, setTranslationText] = React.useState("");
    
    // Handlers
    const handleLanguageFrom = event => {
        setlanguageFromSelect(event.target.value);
    };
    
    const handleLanguageTo = event => {
        setlanguageToSelect(event.target.value);
    };

    const handleInputTextChange = event => {
        setInputText(event.target.value);
    }
    
    // The function that actually does the translation
    const translate = async () => {
        console.log("fetching translation");
        console.log(`q: ${inputText}`);
        console.log(`source: ${languageFromSelect}`);
        console.log(`target: ${languageToSelect}`);

        const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: inputText,
            source: languageFromSelect,
            target: languageToSelect,
            format: "text"
        }),
        headers: { "Content-Type": "application/json" }
    });
        let translationObj = await res.json();
        setTranslationText(translationObj["translatedText"]);
    };

    const classes = useStyles();
    
    return (
      <div className="translate-input-area">
        <GridContainer>
        <GridItem xs={12} sm={8} md={4} lg={4}>

            {/*-------------- DROPDOWN SELECTORS FOR CHOOSING LANGUAGES  -------------*/}
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
                value="en"
                >
                English
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="es"
                >
                Spanish
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="de"
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
                value="en"
                >
                English
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="es"
                >
                Spanish
                </MenuItem>
                <MenuItem
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value="de"
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
                    inputProps={{
                        value: inputText,
                        onChange: handleInputTextChange
                    }}
                />
                <Button onClick={translate} color="primary" round><Translate />Translate</Button>
            </GridItem>

            {/* ------ The resulting translation text ------- */}
            <GridItem xs={12} sm={6} md={4} lg={4}>
                <h3>Translation</h3><br/>
                <h5>{translationText}</h5>
            </GridItem>

        </GridContainer>
      </div>
    );
  }
  
  export default TranslationInputArea;