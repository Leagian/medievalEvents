import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// MATERIAL
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// SERVICE
import eventAPI from "../services/eventAPI";

function Admin() {
  const [events, setEvents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // event ajouté
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchText, setSearchText] = useState(""); // Stocke le texte de recherche
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [categorieList, setCategorieList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [editingEvent, setEditingEvent] = useState({
    title: "",
    description: "",
    address: "",
    site: "",
    date: "",
    categorie_id: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events/`)
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories/`)
      .then((response) => setCategorieList(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenDelete = (eventId) => {
    setDeletingEventId(eventId);
    setOpenDelete(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenEdit = (event) => {
    // Rendre la date au format format 'yyyy-mm-dd'
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(event.date)) {
      // The date is not in the correct format
      console.error("Invalid date:", event.date);
    } else {
      // La date est correcte
      setEditingEvent({
        ...event,
        date: event.date,
        categorie_id: event.categorie_id,
      });

      setOpenEdit(true);
    }
  };

  const handleDelete = () => {
    eventAPI
      .delete(deletingEventId)
      .then(() => {
        setEvents(events.filter((event) => event.id !== deletingEventId));
      })
      .catch((error) => console.error(error));
    handleCloseDelete();
  };

  const handleUpdate = () => {
    const formData = new FormData();
    Object.entries(editingEvent).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", imageFile);

    eventAPI
      .update(editingEvent.id, formData)
      .then(() => {
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? editingEvent : event
          )
        );
        setShowConfirmation(true); // Afficher le message de confirmation
        handleCloseEdit(); // Fermer la boîte de dialogue
      })
      .catch((error) => console.error(error));
  };

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const handleChange = (event) => {
    setEditingEvent({
      ...editingEvent,
      categorie_id: Number(event.target.value),
    });
  };

  const onSearch = (text) => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
    onSearch(target.value);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <h1>Page d'administration</h1>
      <h2>Liste des événements</h2>
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Rechercher"
      />

      {filteredEvents.map((event) => (
        <div key={event.id}>
          <Link to={`/events/${event.id}`}>
            <h3>{event.title}</h3>
          </Link>
          <p>{event.description}</p>
          <p>{event.category}</p>
          <button type="submit" onClick={() => handleClickOpenDelete(event.id)}>
            Supprimer
          </button>
          <button type="submit" onClick={() => handleClickOpenEdit(event)}>
            Modifier
          </button>
        </div>
      ))}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Supprimer l'événement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet événement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Annuler</Button>
          <Button onClick={handleDelete}>Supprimer</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        PaperProps={{
          style: {
            height: "80vh",
          },
        }}
      >
        <DialogTitle>Modifier l'événement</DialogTitle>
        <DialogContent>
          {editingEvent && (
            <>
              <TextField
                inputProps={{
                  style: {
                    width: "400px",
                    height: "50px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  },
                }}
                label="Titre"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
              />
              <TextField
                inputProps={{
                  style: {
                    width: "400px",
                    height: "200px",
                  },
                }}
                multiline
                rows={4}
                label="Description"
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                type="file"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />

              <TextField
                inputProps={{
                  style: {
                    width: "400px",
                    height: "50px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  },
                }}
                label="Adresse"
                value={editingEvent.address}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, address: e.target.value })
                }
              />
              <TextField
                inputProps={{
                  style: {
                    width: "400px",
                    height: "50px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  },
                }}
                label="Site"
                value={editingEvent.site}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, site: e.target.value })
                }
              />
              <TextField
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editingEvent.date}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, date: e.target.value })
                }
              />
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="categorie-label">Catégorie</InputLabel>
                <Select
                  value={
                    editingEvent.categorie_id
                      ? String(editingEvent.categorie_id)
                      : ""
                  }
                  onChange={handleChange}
                >
                  {categorieList.map((category) => (
                    <MenuItem key={category.id} value={String(category.id)}>
                      {category.cat_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Annuler</Button>
          <Button onClick={handleUpdate}>Sauvegarder</Button>
        </DialogActions>
      </Dialog>
      {showConfirmation && (
        <Dialog onClose={handleCloseConfirmation}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              L'événement a bien été ajouté !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Admin;
