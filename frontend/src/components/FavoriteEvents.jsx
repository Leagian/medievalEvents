import PropTypes from "prop-types";

// MATERIAL
import { Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// COMPONENT
import EventCard from "./EventCard";

function FavoriteEvents({ userEvents, handleOpenDialog }) {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
        Vos évènements Favoris :
      </Typography>
      <Grid container style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {userEvents.map((event) => {
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
