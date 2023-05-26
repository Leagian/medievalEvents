import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";

// IMAGE
import defaultImage from "../assets/defaultImage.png";

const useStyles = makeStyles({
  eventImage: {
    // maxWidth: "600px",
    // maxHeight: "350px",
    width: "650px",
    height: "360px",
    objectFit: "cover",
  },
});

function EventImage({ image, alt }) {
  const classes = useStyles();

  const imageUrl = image
    ? `${import.meta.env.VITE_BACKEND_URL}/${image}`
    : defaultImage;

  return <img src={imageUrl} alt={alt} className={classes.eventImage} />;
}

EventImage.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
};

EventImage.defaultProps = {
  image: null,
};

export default EventImage;
