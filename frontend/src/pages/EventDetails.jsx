import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const [eventData, setEventData] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    // todo api
    fetch(`/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEventData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [eventId]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <img src={eventData.image} alt={eventData.title} />
      <h1>{eventData.title}</h1>
      <h2>{eventData.category}</h2>
      <p>{eventData.text}</p>
      <Link to="/">Retour à la liste des événements</Link>
    </div>
  );
}

export default EventDetails;
