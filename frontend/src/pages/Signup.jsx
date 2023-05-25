import React from "react";
import PropTypes from "prop-types";

// COMPONENT
import SignupModal from "../components/SignupModal";

function Signup({ isOpen, closeModal, toggleLoginModal }) {
  return (
    <SignupModal
      isOpen={isOpen}
      closeModal={closeModal}
      toggleLoginModal={toggleLoginModal}
    />
  );
}

Signup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
};

export default Signup;
