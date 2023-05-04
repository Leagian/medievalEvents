import React from "react";
import PropTypes from "prop-types";

const defaultAvatarUrl = "https://via.placeholder.com/150";

function Avatar({ imageUrl }) {
  return (
    <img src={imageUrl || defaultAvatarUrl} alt="avatar" className="avatar" />
  );
}

Avatar.propTypes = {
  imageUrl: PropTypes.string,
};

Avatar.defaultProps = {
  imageUrl: defaultAvatarUrl,
};

export default Avatar;
