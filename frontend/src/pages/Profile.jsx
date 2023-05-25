import React, { useRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import PropTypes from "prop-types";

// MATERIAL
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// COMPONENT
import CustomAvatar from "../components/CustomAvatar";
import FavoriteEvents from "../components/FavoriteEvents";

// HOOK
import useUserProfile from "../hooks/useUserProfile";

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

function Profile() {
  const { id } = useParams();
  const {
    user,
    userEvents,
    handleAvatarUpload,
    open,
    handleOpenDialog,
    handleRemoveFromFavorites,
    handleClose,
    eventDelete,
  } = useUserProfile(id);

  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h1>
        Hello, {user.name} {user.id}
      </h1>
      <CustomAvatar
        photoUrl={user.avatar}
        handleAvatarUpload={handleAvatarUpload}
      />
      <button type="submit" onClick={handleFileSelect}>
        Modifier
      </button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleAvatarUpload}
      />
      <FavoriteEvents
        userEvents={userEvents}
        handleOpenDialog={handleOpenDialog}
      />
      <Outlet />
      <DeleteEventDialog
        open={open}
        handleClose={handleClose}
        handleRemoveFromFavorites={handleRemoveFromFavorites}
        eventDelete={eventDelete}
      />
    </div>
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

export default Profile;
