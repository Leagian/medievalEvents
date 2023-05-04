// Signup.js
import React from "react";
import PropTypes from "prop-types";
import SignupModal from "../components/SignupModal";

function Signup({ isOpen, closeModal }) {
  return <SignupModal isOpen={isOpen} closeModal={closeModal} />;
}

Signup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Signup;
