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
        const res = await fetch(`http://openlibrary.org/search.json?q="${searchText}"&limit=50`);
        let books = await res.json();

        console.log("populating book cards");
        setBookArr(books);
    }

    const filterBooks = (book) => {
        // books that dont have isbns (like one in every 10) breaks my app
        // not an ideal solution but I'm just filtering them out

        return Object.keys(book).includes("isbn") &&
        Object.keys(book).includes("author_name") &&
        Object.keys(book).includes("key") &&
        Object.keys(book).includes("title");
    }

    const showBooks = (books) => {
        console.log(books)
        let newBookArr = []
        books.map((book, index) => {
          return newBookArr.push(
            <span className="book-card" key={index}>
                <BookCard
                    bookKey={book["key"]}
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


    return (
        <div>
            <div className="book-finder-div">
                <GridContainer 
                alignItems="center"
                justify="center"
                >
                <GridItem xs={12} sm={12} md={6} lg={4}>
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
                <GridContainer className="book-card-container" sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {bookArr ?
                showBooks(bookArr["docs"].filter(filterBooks)) :

                <GridItem>
                    <h5>Search to see books here</h5>
                </GridItem>
                }
                </GridContainer>

                </GridItem>
            </GridContainer>
            </div>
        </div>
          );
}

export default BookFinder