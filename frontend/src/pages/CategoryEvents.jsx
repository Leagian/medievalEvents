import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MATERIAL
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// COMPONENT
import EventList from "../components/EventList";
import CustomPagination from "../components/CustomPagination";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

function CategoryEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { id: category } = useParams();
  const navigate = useNavigate(); // HandlePrevious retour à la page précédente

  const { dataEvents } = useDataContext();

  const filteredCategoryEvents = dataEvents.filter(
    (event) => event.category === category && event.isApproved === 1
  );

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
      <IconButton
        sx={{ marginLeft: "8rem", marginTop: "1rem" }}
        onClick={handlePrevious}
      >
        <ArrowBackIcon />
        <Typography variant="body1">RETOUR</Typography>
      </IconButton>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        {category.toUpperCase()}
      </Typography>
      <EventList events={displayedEvents} columns={2} />
      <CustomPagination
        totalItems={filteredCategoryEvents.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CategoryEvents;
