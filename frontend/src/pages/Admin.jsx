import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// MATERIAL
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// DIALOG
import DeleteAdminDialog from "../dialogs/DeleteAdminDialog";
import EditAdminDialog from "../dialogs/EditAdminDialog";
import ConfirmationAdminDialog from "../dialogs/ConfirmationAdminDialog";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

// SERVICE
import eventManagerAPI from "../services/eventManagrAPI";

function Admin() {
  const { filterApprovedEvents, filterNonApprovedEvents } = useDataContext();
  const [events, setEvents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // event ajouté
  const [searchText, setSearchText] = useState(""); // Stocke le texte de recherche
  const [showApprovedOnly, setShowApprovedOnly] = useState(true); // checkbox filtre approved
  const [filteredEvents, setFilteredEvents] = useState([]);
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
    isApproved: 0,
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
    eventManagerAPI
      .delete(deletingEventId)
      .then(() => {
        setEvents(events.filter((event) => event.id !== deletingEventId));
        setFilteredEvents(
          filteredEvents.filter((event) => event.id !== deletingEventId)
        );
      })
      .catch((error) => console.error(error));
    handleCloseDelete();
  };

  const handleUpdate = () => {
    const formData = new FormData();
    Object.entries(editingEvent).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    eventManagerAPI
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
    if (file) {
      setImageFile(file);
    }
  };

  const handleChange = (event) => {
    setEditingEvent({
      ...editingEvent,
      categorie_id: Number(event.target.value),
    });
  };

  const onSearch = (text, newShowApprovedOnly) => {
    let filtered = events.filter((event) =>
      event.title.toLowerCase().includes(text.toLowerCase())
    );

    if (newShowApprovedOnly) {
      filtered = filterApprovedEvents(filtered);
    } else {
      filtered = filterNonApprovedEvents(filtered);
    }

    setFilteredEvents(filtered);
  };

  const handleShowApprovedChange = (event) => {
    const newShowApprovedOnly = event.target.checked;
    setShowApprovedOnly(newShowApprovedOnly);
    onSearch(searchText, newShowApprovedOnly);
  };

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
    onSearch(target.value, showApprovedOnly);
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
      <FormControlLabel
        control={
          <Switch
            checked={showApprovedOnly}
            onChange={handleShowApprovedChange}
          />
        }
        label="Approuvé"
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
      <DeleteAdminDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
      />
      <EditAdminDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        handleUpdate={handleUpdate}
        handleImageChange={handleImageChange}
        handleChange={handleChange}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
        categorieList={categorieList}
      />
      <ConfirmationAdminDialog
        open={showConfirmation}
        handleClose={handleCloseConfirmation}
      />
    </div>
  );
}

export default Admin;
