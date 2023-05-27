import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// MATERIAL
import { Link as MuiLink, Typography, Box } from "@mui/material";

// COMPONENT
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

  const { id, title, image, category, description, date, address } =
    highlightedEvent;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>{title}</h2>
      <Link to={`/events/${id}`}>
        <EventImage image={image} alt={title} />
      </Link>
      <p>{description}</p>
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
      <p>{address}</p>
      <p>{date}</p>
    </Box>
  );
}

export default Highlight;
