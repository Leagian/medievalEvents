import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";

// IMAGE
import defaultImage from "../assets/defaultImage.png";

const useStyles = makeStyles({
  eventImage: {
    width: "100%", // This makes the image responsive
    height: "auto", // This keeps the aspect ratio of the image
    maxWidth: "650px", // This limits the maximum width of the image
    maxHeight: "400px", // This limits the maximum height of the image
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
