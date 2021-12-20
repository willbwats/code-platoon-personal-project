
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
        return `https://www.amazon.com/s?k=${props.imgSrc}`
    }

    return (
        <Card style={{ width: "15rem" }}>
        <img
            style={{ height: "180px", width: "100%", display: "block" }}
            className={classes.imgCardTop}
            src={`http://covers.openlibrary.org/b/isbn/${props.imgSrc}-M.jpg`}
            alt="Book cover"
        />
        <CardBody>
            <h4 className={classes.cardTitle}>{props.title}</h4>
            <p>
            {props.author}
            </p>
            <Link to="{genAmazonLink()}"><Button color="primary">Search on Amazon</Button></Link>
        </CardBody>
        </Card>
    );
    }