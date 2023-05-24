import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

// IMAGE
import defaultAvatar from "../assets/defaultAvatar.png";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: "50%",
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

CustomAvatar.defaultProps = {
  photoUrl: null,
};

export default CustomAvatar;
