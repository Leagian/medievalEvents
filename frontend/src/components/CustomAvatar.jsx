import React from "react";
import PropTypes from "prop-types";

// MATERIAL

import Avatar from "@material-ui/core/Avatar";

// IMAGE
import defaultAvatar from "../assets/defaultAvatar.png";

function CustomAvatar({ photoUrl, style }) {
  const avatarUrl = photoUrl
    ? `${import.meta.env.VITE_BACKEND_URL}/${photoUrl}`
    : defaultAvatar;

  return <Avatar src={avatarUrl} alt="avatar" style={style} />;
}

CustomAvatar.propTypes = {
  photoUrl: PropTypes.string,
  style: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
};

export default CustomAvatar;
