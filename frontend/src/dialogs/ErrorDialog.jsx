import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Dialog, DialogTitle } from "@mui/material";

function ErrorDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Une erreur s'est produite, veuillez réessayer.</DialogTitle>
    </Dialog>
  );
}

ErrorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorDialog;
