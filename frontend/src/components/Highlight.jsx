import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// MATERIAL-UI
import { Link as MuiLink, Typography, Box } from "@mui/material";

// COMPONENTS
import EventImage from "./EventImage";
import { useDataContext } from "../contexts/DataContext";

function Highlight() {
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const { dataEvents, filterApprovedEvents } = useDataContext();

  useEffect(() => {
    // Filtrer les événements approuvés
    const approvedEvents = filterApprovedEvents(dataEvents);
    // Choisissez un événement approuvé aléatoire
    if (approvedEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * approvedEvents.length);
      const event = approvedEvents[randomIndex];
      setHighlightedEvent(event);
    }
  }, [dataEvents, filterApprovedEvents]);

  if (!highlightedEvent) {
    return <div>Loading...</div>;
  }

  const { id, title, image, category, description, date } = highlightedEvent;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MuiLink
        component={Link}
        to={`/events/${id}`}
        underline="none"
        color="inherit"
        sx={{ "&:hover": { color: "#888" } }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} mt={2}>
          {title}
        </Typography>
      </MuiLink>
      <Box sx={{ position: "relative" }}>
        <Link to={`/events/${id}`}>
          <EventImage image={image} alt={title} />
          <Box
            sx={{
              position: "absolute",
              bottom: 3,
              left: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              padding: "8px",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {description}
            </Typography>
          </Box>
        </Link>
      </Box>
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
      <Typography>{date}</Typography>
    </Box>
  );
}

export default Highlight;
