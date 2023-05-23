import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONTEXT
import { useAuthContext } from "../contexts/AuthContext";

// SERVICE
import profileAPI from "../services/profileAPI";
import avatarAPI from "../services/avatarAPI";

function useUserProfile(id) {
  const [userEvents, setUserEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventDelete, setEventDelete] = useState(null);
  const { user, updateUserAvatar } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    profileAPI
      .get(`/api/users/${id}/favorites`)
      .then((response) => setUserEvents(response.data))
      .catch((error) => {
        console.error(error);
        if (
          error.response.status === 401 &&
          error.response.data === "Authentication token expired"
        ) {
          navigate.push("/login"); // redirection vers la page de connexion
        }
      });
  }, [user, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveFromFavorites = () => {
    profileAPI
      .delete(`/api/users/${eventDelete.id}/favorites`)
      .then(() => {
        setUserEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventDelete.id)
        );
        handleClose();
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'événement des favoris :",
          error
        );
      });
  };

  const handleOpenDialog = (event) => {
    setEventDelete(event);
    setOpen(true);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    avatarAPI
      .post(`/api/uploads/${user.id}/avatar`, formData)
      .then((response) => {
        updateUserAvatar(response.data.avatarUrl);
      })
      .catch((error) => {
        console.error("Erreur lors de l'upload de l'avatar :", error);
      });
  };

  return {
    user,
    userEvents,
    handleAvatarUpload,
    open,
    handleOpenDialog,
    handleRemoveFromFavorites,
    handleClose,
    eventDelete,
  };
}

export default useUserProfile;
