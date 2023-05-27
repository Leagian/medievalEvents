import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MATERIAL
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// COMPONENT
import EventImage from "./EventImage";

function FavoriteEvents({ userEvents, handleOpenDialog }) {
  return (
    <div>
      <h2>Evénements Favoris :</h2>
      {userEvents.map((event) => {
        if (event.id) {
          return (
            <div key={event.id}>
              <Link to={`/events/${event.id}`}>
                <EventImage image={event.image} alt={event.title} />
              </Link>
              <Link to={`/categories/${event.category}`}>
                <h5>{event.category}</h5>
              </Link>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.address}</p>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => handleOpenDialog(event)}
              >
                Delete
              </Button>
            </div>
          );
        }
        return null;
      })}
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
