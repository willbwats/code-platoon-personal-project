import React from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import GridItem from "../assets/jss/material-kit-pro-react/components/Grid/GridItem.js";
import GridContainer from "../assets/jss/material-kit-pro-react/components/Grid/GridContainer.js";
import CustomInput from '../assets/jss/material-kit-pro-react/components/CustomInput/CustomInput.js';
import IconButton from '@mui/material/IconButton';
import BookCard from '../components/BookCard';


function BookFinder() {

    // book search input text
    const [searchText, setSearchText] = React.useState("");
    const [bookArr, setBookArr] = React.useState(null);

    //Open library books API call
    const searchBooks = async (searchText) => {
        console.log("Calling API..")
        const res = await fetch(`http://openlibrary.org/search.json?q="${searchText}"&limit=5`);
        let books = await res.json();

        console.log("populating book cards");
        setBookArr(books);
    }

    const showBooks = (books) => {
        console.log(books)
        let newBookArr = []
        books.map((book, index) => {
          return newBookArr.push(
            <span key={index}>
                <BookCard
                    author={book["author_name"][0]}
                    title={book["title"]}
                    imgSrc={book["isbn"][0]}
                />
            </span>
            )
        })
        return newBookArr;
      }

    const handleSearchInputChanged = event => {
        setSearchText(event.target.value);
    }

    const handleBookSearchClicked = () => {
        console.log("Search button clicked..");
        searchBooks(searchText);
    }
    
    // React.useEffect(() => {
    //     console.log("book cards were updated.")
    // },[bookArr]);

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
                <GridItem xs={12} sm={12} md={12}>
                <GridContainer sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {bookArr ? 
                showBooks(bookArr["docs"]) :
                <h5>Search to see books here</h5>
                }
                </GridContainer>

                </GridItem>
            </GridContainer>
            </div>
        </div>
          );
}

export default BookFinder