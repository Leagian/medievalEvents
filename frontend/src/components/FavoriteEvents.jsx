import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// COMPONENT
import EventCard from "./EventCard";
import CustomPagination from "./CustomPagination";

function FavoriteEvents({ userEvents, handleOpenDialog }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // PAGINATION
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEvents = userEvents.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
        Vos évènements Favoris :
      </Typography>
      <Grid container spacing={3}>
        {displayedEvents.map((event) => {
          if (event.id) {
            return (
              <Grid item xs={6} key={event.id}>
                <EventCard
                  key={event.id}
                  id={event.id}
                  image={event.image}
                  title={event.title}
                  category={event.category}
                  address={event.address}
                  description={event.description}
                  date={event.date}
                  limitedInfo
                  columns={2}
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleOpenDialog(event)}
                >
                  Retirer
                </Button>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
      <CustomPagination
        totalItems={userEvents.length} // Remplacez filteredData par vos propres données
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

FavoriteEvents.propTypes = {
  userEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      address: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};

export default FavoriteEvents;
