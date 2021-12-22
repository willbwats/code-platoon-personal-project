
import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui icons
// core components
import Card from "../assets/jss/material-kit-pro-react/components/Card/Card.js";
import CardBody from "../assets/jss/material-kit-pro-react/components/Card/CardBody.js";
import Button from "../assets/jss/material-kit-pro-react/components/CustomButtons/Button.js";

import imagesStyles from "../assets/jss/material-kit-pro-react/imagesStyles.js";

import { cardTitle } from "../assets/jss/material-kit-pro-react.js";

const style = {
  ...imagesStyles,
  cardTitle
};

const useStyles = makeStyles(style);

export default function BookCard(props) {
    /*
    props:
    imgSrc
    author
    title
    searchLink
    */

    const classes = useStyles();

    const genAmazonLink = () => {
        return `https://www.amazon.com/s?k=${props.imgSrc}`;
    }

    const genLibraryLink = () => {
        return `https://openlibrary.org${props.bookKey}`;
    }

    return (
        <Card style={{ width: "15rem" }}>
        <img
            style={{ height: "150px", width: "100%", display: "block" }}
            className={classes.imgCardTop}
            src={`http://covers.openlibrary.org/b/isbn/${props.imgSrc}-M.jpg?default=false`}
            alt="Book cover"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://images-na.ssl-images-amazon.com/images/I/91bj48+ZkaL.jpg"}}
        />

        <CardBody>
            <h4 className={classes.cardTitle}>{props.title}</h4>
            <span className="book-card-author-text">
            {props.author}
            </span>
            <a className={classes.cardLink} target="_blank" href={genAmazonLink()}><Button color="primary">Search Amazon</Button></a>
            <a target="_blank" href={genLibraryLink()}><Button color="primary">Open Library</Button></a>
        </CardBody>
        </Card>
    );
    }