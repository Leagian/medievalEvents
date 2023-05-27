import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MATERIAL
import { Button, Box, Link as MuiLink, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// COMPONENT
import EventImage from "./EventImage";

function FavoriteEvents({ userEvents, handleOpenDialog }) {
  return (
    <div>
      <h2>Evénements Favoris :</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userEvents.map((event) => {
          if (event.id) {
            return (
              <div key={event.id}>
                <Link to={`/events/${event.id}`}>
                  <EventImage image={event.image} alt={event.title} />
                </Link>
                <MuiLink
                  component={Link}
                  to={`/categories/${event.category}`}
                  underline="hover"
                  color="inherit"
                  sx={{ "&:hover": { color: "#888" } }}
                >
                  <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                    {event.category}
                  </Typography>
                </MuiLink>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.address}</p>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f44336", // changer à votre couleur désirée
                    },
                  }}
                  startIcon={<DeleteIcon />}
                  onClick={() => handleOpenDialog(event)}
                >
                  Retirer
                </Button>
              </div>
            );
          }
          return null;
        })}
      </Box>
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
