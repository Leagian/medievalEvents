import React, { useRef } from "react";
import { Outlet, useParams } from "react-router-dom";

// MATERIAL
import { Box, Button, Typography } from "@mui/material";

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
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        <Typography
          variant="h4"
          style={{ color: "#42555e" }}
          fontWeight="bold"
          mt={5}
          mb={3}
        >
          Salut, {user.name}!
        </Typography>
        <Typography variant="h6">Bienvenue sur votre profil</Typography>
        <Typography variant="h6" mb={4}>
          Tu peux changer ton avatar ici, et n'oublie pas de marquer tes
          événements préférés !
        </Typography>
        <CustomAvatar
          photoUrl={user.avatar}
          handleAvatarUpload={handleAvatarUpload}
          style={{ width: "10rem", height: "auto" }}
        />
        <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={handleFileSelect}
          sx={{ marginTop: "1rem" }}
        >
          Modifier
        </Button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleAvatarUpload}
        />
      </Box>
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
    </>
  );
}

export default Profile;
