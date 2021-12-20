import React, { useState, useEffect } from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import GridItem from "../assets/jss/material-kit-pro-react/components/Grid/GridItem.js";
import GridContainer from "../assets/jss/material-kit-pro-react/components/Grid/GridContainer.js";
import CustomInput from '../assets/jss/material-kit-pro-react/components/CustomInput/CustomInput.js';
import IconButton from '@mui/material/IconButton';

function BookFinder() {

    // book search input text
    const [searchText, setSearchText] = React.useState("");

    //Open library books API call
    const searchBooks = async (searchText) => {
        console.log("Calling API..")
        const res = await fetch(`http://openlibrary.org/search.json?q=${searchText}`)
    }

    const handleSearchInputChanged = event => {
        setSearchText(event.target.value);
    }

    const handleBookSearchClicked = () => {
        console.log("Search button clicked..");
        searchBooks(searchText);
    }
    
    return (
        <div>
            <div className="book-finder-div">
                <GridContainer 
                alignItems="center"
                justify="center"
                >
                <GridItem xs={12} sm={12} md={6}>
                    <h1>Book finder</h1>
                    <CustomInput
                        
                        labelText="Enter a language and/or other keywords"
                        id="search"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            value: searchText,
                            onChange: handleSearchInputChanged,
                            endAdornment: (<InputAdornment onClick={handleBookSearchClicked} position="end"><IconButton><SearchIcon/></IconButton></InputAdornment>)
                        }}
                    />
                </GridItem>
            </GridContainer>
            </div>
        </div>
          );
}

export default BookFinder