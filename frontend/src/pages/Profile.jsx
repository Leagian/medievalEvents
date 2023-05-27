import React, { useRef } from "react";
import { Outlet, useParams } from "react-router-dom";

// DIALOG
import DeleteEventDialog from "../dialogs/DeleteEventDialog";

// COMPONENT
import CustomAvatar from "../components/CustomAvatar";
import FavoriteEvents from "../components/FavoriteEvents";

// HOOK
import useUserProfile from "../hooks/useUserProfile";

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
      <h1>Hello, {user.name}!</h1>
      <p>Bienvenue sur votre page de profil!</p>
      <p>
        Ici vous pouvez modifier votre avatar et ajouter vos évènements favoris
      </p>
      <CustomAvatar
        photoUrl={user.avatar}
        handleAvatarUpload={handleAvatarUpload}
        style={{ width: "50px", height: "50px" }}
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

export default Profile;
