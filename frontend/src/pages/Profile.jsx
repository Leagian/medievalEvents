import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

// MATERIAL
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// SERVICE
import profileAPI from "../services/profileAPI";

// CONTEXT
import { useAuthContext } from "../contexts/AuthContext";

function Profile() {
  const [userEvents, setUserEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);

  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    // Faites une requête à votre backend pour obtenir tous les événements de l'utilisateur
    profileAPI
      .get(`/api/users/${id}/favorites`)
      .then((response) => setUserEvents(response.data))
      .catch((error) => console.error(error));
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveFromFavorites = () => {
    profileAPI
      .delete(`/api/users/${eventToRemove.id}/favorites`)
      .then(() => {
        // Mettez à jour la liste des événements de l'utilisateur en enlevant l'événement supprimé
        setUserEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventToRemove.id)
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
    setEventToRemove(event);
    setOpen(true);
  };

  return (
    <div>
      <h1>
        Hello, {user.username} {user.id}
      </h1>
      <h2>Evénements ajoutés par l'utilisateur :</h2>
      {userEvents.map((event) => {
        if (event.id) {
          return (
            <div key={event.id}>
              <Link to={`/events/${event.id}`}>
                <img src={event.image} alt={event.title} />
              </Link>
              <h5>{event.category}</h5>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.address}</p>
              <button type="submit" onClick={() => handleOpenDialog(event)}>
                Retirer des favoris
              </button>
            </div>
          );
        }
        return null; // Ignorer les objets sans clé
      })}
      <Outlet />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Supprimer l'événement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet événement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={() => handleRemoveFromFavorites(eventToRemove)}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
