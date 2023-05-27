import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div
      className="highlight--global"
      style={{ maxWidth: "700px", margin: "auto" }}
    >
      <h2>{title}</h2>
      <Link to={`/events/${id}`}>
        <EventImage image={image} alt={title} />
      </Link>
      <p>{description}</p>
      <Link to={`/categories/${category}`}>
        <p>{category}</p>
      </Link>
      <p>{address}</p>
      <p>{date}</p>
    </div>
  );
}

export default Highlight;
