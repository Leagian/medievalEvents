import React, { useState, useEffect } from "react";
import axios from "axios";

// MATERIAL
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// SERVICE
import eventAPI from "../services/eventAPI";

function Admin() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = (eventId) => {
    eventAPI
      .delete(eventId)
      .then(() => {
        setEvents(events.filter((event) => event.id !== eventId));
      })
      .catch((error) => console.error(error));
    handleClose();
  };

  return (
    <div>
      <h1>Page d'administration</h1>
      <h2>Liste des événements</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <button type="submit" onClick={handleClickOpen}>
            Supprimer
          </button>
        </div>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Supprimer l'événement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet événement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={() => handleDelete(event.id)}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Admin;
