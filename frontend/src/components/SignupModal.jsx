import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SignupForm from "./SignupForm";

function SignupModal({ isOpen, closeModal, toggleLoginModal }) {
  const handleSuccess = (token) => {
    localStorage.setItem("token", token);
    closeModal();
    toggleLoginModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>
        Inscription
        <IconButton
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
          onClick={closeModal}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <SignupForm onSignUpSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}

SignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
};

export default SignupModal;
