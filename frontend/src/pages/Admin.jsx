import React, { useState, useEffect } from "react";

// MATERIAL
import { Typography, Grid, TextField, Box, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// COMPONENT
import EventCard from "../components/EventCard";
import CustomPagination from "../components/CustomPagination";

// DIALOG
import DeleteAdminDialog from "../dialogs/DeleteAdminDialog";
import EditAdminDialog from "../dialogs/EditAdminDialog";
import ConfirmationAdminDialog from "../dialogs/ConfirmationAdminDialog";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

// SERVICE
import eventAPI from "../services/eventAPI";
import categoryAPI from "../services/categoryAPI";

// HELPER
import formatDate from "../helpers/DateHelper";

function Admin() {
  const { filterApprovedEvents, filterNonApprovedEvents } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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
    eventAPI
      .getAll()
      .then((response) => {
        const formattedEvents = response.map((event) => ({
          ...event,
          date: formatDate(event.date),
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    categoryAPI
      .getAll()
      .then((response) => {
        setCategorieList(response);
      })
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
    eventAPI
      .getOne(event.id)
      .then((response) => {
        const fetchedEvent = response.data;
        // Récupérer la date initiale de l'événement
        const initialDate = fetchedEvent.date;

        if (!initialDate) {
          // La date est vide ou invalide
          console.error("Invalid date:", initialDate);
        } else {
          let formattedDate = initialDate;

          if (initialDate.includes("/")) {
            // Extraire les composants de la date initiale (jour, mois, année)
            const [day, month, year] = initialDate.split("/");

            // Construire la date au format 'yyyy-mm-dd' pour l'affichage
            formattedDate = `${year}-${month}-${day}`;
          }

          setEditingEvent({
            ...fetchedEvent,
            date: formattedDate,
            categorie_id: fetchedEvent.categorie_id,
            isApproved: fetchedEvent.isApproved,
          });
        }
      })
      .catch((error) => console.error(error));

    setOpenEdit(true);
  };

  const handleDelete = () => {
    eventAPI
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
    eventAPI
      .update(editingEvent.id, formData)
      .then(() => {
        return eventAPI.getOne(editingEvent.id);
      })
      .then((response) => {
        const updatedEvent = response.data;
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? updatedEvent : event
          )
        );
        setShowConfirmation(true);
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

  const onSearch = (text, newShowApprovedOnly) => {
    let filtered = events.filter((event) =>
      event.title
        ? event.title.toLowerCase().includes(text.toLowerCase())
        : false
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

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  // PAGINATION
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        mt={5}
      >
        Page Admin
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          label="Rechercher"
          type="text"
          value={searchText}
          onChange={handleSearch}
          variant="standard"
          fullWidth
          sx={{
            maxWidth: "20%",
            marginBottom: "3rem",
          }}
        />
        <FormControlLabel
          control={
            <Switch
              color="warning"
              checked={showApprovedOnly}
              onChange={handleShowApprovedChange}
            />
          }
          label="Filtrer par approbation"
          labelPlacement="start"
        />
      </Box>

      <Grid container style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {displayedEvents.map((event) => (
          <Grid item xs={6} key={event.id}>
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
              title={event.title}
              category={event.category}
              description={event.description}
              address={event.address}
              date={event.date}
              showCat
              showDate
              showDesc
              showAddress
            />
            <Box display="flex" ml={3}>
              <Button
                sx={{ marginRight: "1rem" }}
                variant="outlined"
                onClick={() => handleClickOpenEdit(event)}
              >
                Modifier
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClickOpenDelete(event.id)}
              >
                Supprimer
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
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
        categorieList={categorieList}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
      />
      <ConfirmationAdminDialog
        open={showConfirmation}
        handleClose={handleCloseConfirmation}
      />
      <CustomPagination
        totalItems={filteredEvents.length} // Remplacez filteredData par vos propres données
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Admin;
