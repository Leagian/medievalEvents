import PropTypes from "prop-types";

// MATERIAL
import { Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// COMPONENT
import EventCard from "./EventCard";

function FavoriteEvents({ userEvents, handleOpenDialog }) {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
        Vos évènements Favoris :
      </Typography>
      <Grid container style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {userEvents.map((event) => {
          if (event.id) {
            return (
              <Grid item xs={6} key={event.id}>
                <EventCard
                  id={event.id}
                  image={event.image}
                  title={event.title}
                  description={event.description}
                  showDesc
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleOpenDialog(event)}
                  sx={{ marginLeft: "1.3rem" }}
                >
                  Retirer
                </Button>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
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
