import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

// IMAGE
import defaultAvatar from "../assets/defaultAvatar.png";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function CustomAvatar({ photoUrl }) {
  const classes = useStyles();

  const avatarUrl = photoUrl
    ? `${import.meta.env.VITE_BACKEND_URL}/${photoUrl}`
    : defaultAvatar;

  return <Avatar src={avatarUrl} alt="avatar" className={classes.avatar} />;
}

CustomAvatar.propTypes = {
  photoUrl: PropTypes.string,
};

export default CustomAvatar;
