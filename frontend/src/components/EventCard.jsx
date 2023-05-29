import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MATERIAL
import { Link as MuiLink, Typography, Box } from "@mui/material";

// COMPONENT
import EventImage from "./EventImage";

function EventCard({
  id,
  image,
  title,
  category,
  date,
  address,
  description,
  showCat = false,
  showDesc = false,
  showAddress = false,
  showDate = false,
}) {
  return (
    <Box p={3}>
      <MuiLink
        component={Link}
        to={`/events/${id}`}
        underline="none"
        color="inherit"
        sx={{ "&:hover": { color: "#888" } }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          marginTop="2rem"
          marginBottom="0.5rem"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
      </MuiLink>
      <Link to={`/events/${id}`}>
        <EventImage image={image} alt={title} />
      </Link>
      {showCat && (
        <MuiLink
          component={Link}
          to={`/categories/${category}`}
          underline="hover"
          color="inherit"
          sx={{ "&:hover": { color: "#888" } }}
        >
          <Typography variant="h6" mt={1}>
            {category}
          </Typography>
        </MuiLink>
      )}
      <Box style={{ maxWidth: "90%" }}>
        {showDesc && (
          <Typography variant="body1" mt={1}>
            {description}
          </Typography>
        )}
        {showAddress && (
          <Typography variant="body1" mt={1}>
            {address}
          </Typography>
        )}
        {showDate && (
          <Typography variant="body1" mt={1}>
            {date}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  date: PropTypes.string,
  address: PropTypes.string,
  showCat: PropTypes.bool,
  showDesc: PropTypes.bool,
  showAddress: PropTypes.bool,
  showDate: PropTypes.bool,
};

export default EventCard;
