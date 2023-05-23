import React, { useRef } from "react";
import { Outlet, useParams } from "react-router-dom";

// COMPONENT
import CustomAvatar from "../components/CustomAvatar";
import FavoriteEvents from "../components/FavoriteEvents";

// MATERIAL
import EventDialog from "../styles/EventDialog";

// HOOK
import useUserProfile from "../hooks/useUserProfile";

function Profile() {
  const { id } = useParams();
  const {
    user,
    userEvents,
    handleAvatarUpload,
    // handleAvatarUpload,
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
        Hello, {user.username} {user.id}
      </h1>
      <CustomAvatar
        imageUrl={user.avatar}
        handleAvatarUpload={handleAvatarUpload}
      />
      {/* Utilisation de la composante Avatar avec la prop imageUrl et handleAvatarUpload */}
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
      {/* Input de type file pour sélectionner le fichier */}
      <FavoriteEvents
        userEvents={userEvents}
        handleOpenDialog={handleOpenDialog}
      />
      <Outlet />
      <EventDialog
        open={open}
        handleClose={handleClose}
        handleRemoveFromFavorites={handleRemoveFromFavorites}
        eventDelete={eventDelete}
      />
    </div>
  );
}

export default Profile;
