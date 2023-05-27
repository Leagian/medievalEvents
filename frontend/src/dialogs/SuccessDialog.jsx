import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Dialog, DialogTitle } from "@mui/material";

function SuccessDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Votre message a été envoyé avec succès !</DialogTitle>
    </Dialog>
  );
}

SuccessDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessDialog;
