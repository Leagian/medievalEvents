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

// COMPONENT
import Pagination from "../components/Pagination";

// HOOK
import usePagination from "../hooks/usePagination";

// SERVICE
import eventAPI from "../services/eventAPI";

const RESULTS_PER_PAGE = 10;

function Admin() {
  const [events, setEvents] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [categorieList, setCategorieList] = useState([]);
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
      .then((response) => setEvents(response.data))
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
    eventAPI
      .update(editingEvent.id, editingEvent)
      .then(() => {
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? editingEvent : event
          )
        );
        handleCloseEdit();
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    setEditingEvent({
      ...editingEvent,
      categorie_id: Number(event.target.value),
    });
  };

  const { currentPage, jump, maxPage, currentData } = usePagination(
    events,
    RESULTS_PER_PAGE
  );

  return (
    <div>
      <h1>Page d'administration</h1>
      <h2>Liste des événements</h2>
      {currentData().map((event) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={maxPage}
        onPageChange={jump}
      />
    </div>
  );
}

export default Admin;
