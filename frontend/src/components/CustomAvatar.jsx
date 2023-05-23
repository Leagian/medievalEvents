import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import defaultAvatar from "../assets/defaultAvatar.png";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: "50%",
  },
}));

function CustomAvatar({ imageUrl }) {
  const classes = useStyles();

  const avatarUrl = imageUrl
    ? `${import.meta.env.VITE_BACKEND_URL}/${imageUrl}`
    : defaultAvatar;

  return <Avatar src={avatarUrl} alt="avatar" className={classes.avatar} />;
}

CustomAvatar.propTypes = {
  imageUrl: PropTypes.string,
};

CustomAvatar.defaultProps = {
  imageUrl: null,
};

export default CustomAvatar;
