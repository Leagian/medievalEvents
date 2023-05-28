import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MATERIAL
import { IconButton, Typography, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// COMPONENT
import EventCard from "../components/EventCard";
import CustomPagination from "../components/CustomPagination";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

function CategoryEvents() {
  const [categoryEvents, setCategoryEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { id: category } = useParams();
  const navigate = useNavigate(); // HandlePrevious retour à la page précédente

  const { dataEvents, filterApprovedEvents } = useDataContext();
  const filteredCategoryEvents = filterApprovedEvents(categoryEvents);

  useEffect(() => {
    const filteredEvents = dataEvents.filter(
      (event) => event.category === category
    );

    setCategoryEvents(filteredEvents);
  }, [dataEvents, category]);

  const handlePrevious = () => {
    navigate(-1);
  };

  // PAGINATION
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEvents = filteredCategoryEvents.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <IconButton onClick={handlePrevious}>
        <ArrowBackIcon />
        <Typography variant="body1">RETOUR</Typography>
      </IconButton>

      <Typography variant="h5" fontWeight="bold" textAlign="center">
        {category.toUpperCase()}
      </Typography>
      <Grid container spacing={3}>
        {displayedEvents.map((event) => (
          <Grid item xs={6} key={event.id}>
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
              title={event.title}
              description={event.description}
              limitedInfo
              columns={2}
            />
          </Grid>
        ))}
      </Grid>
      <CustomPagination
        totalItems={filteredCategoryEvents.length} // Remplacez filteredData par vos propres données
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CategoryEvents;
