import PropTypes from "prop-types";

// MATERIAL
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function DeleteEventDialog({
  open,
  handleClose,
  handleRemoveFromFavorites,
  eventDelete,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Supprimer l'événement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Êtes-vous sûr de vouloir supprimer cet événement ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={() => handleRemoveFromFavorites(eventDelete)}>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteEventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRemoveFromFavorites: PropTypes.func.isRequired,
  eventDelete: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default DeleteEventDialog;
