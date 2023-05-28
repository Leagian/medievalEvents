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
  description,
  date,
  address,
  limitedInfo = false,
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
      {limitedInfo && (
        <>
          <MuiLink
            component={Link}
            to={`/categories/${category}`}
            underline="hover"
            color="inherit"
            sx={{ "&:hover": { color: "#888" } }}
          >
            <Typography variant="h6" sx={{ marginTop: "1rem" }}>
              {category}
            </Typography>
          </MuiLink>
          <Box style={{ maxWidth: "80%" }}>
            <p>{description}</p>
          </Box>
          <p>{address}</p>
          <p>{date}</p>
        </>
      )}
    </Box>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  limitedInfo: PropTypes.bool,
};

export default EventCard;
