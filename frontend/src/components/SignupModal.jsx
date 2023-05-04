// SignupModal.js
import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import SignupForm from "./SignupForm";

function SignupModal({ isOpen, closeModal }) {
  const handleSuccess = (token) => {
    localStorage.setItem("token", token);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <button
          type="button"
          onClick={closeModal}
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
        >
          X
        </button>
        <SignupForm onSuccess={handleSuccess} />
      </div>
    </Modal>
  );
}

SignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SignupModal;
