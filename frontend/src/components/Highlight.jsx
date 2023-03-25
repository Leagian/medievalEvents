import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/Highlight.css";

function Highlight() {
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const getRandomId = Math.floor(Math.random() * 10) + 1;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${getRandomId}`)
      .then(({ data }) => {
        setHighlightedEvent(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!highlightedEvent) {
    return <p>Chargement en cours...</p>;
  }

  const { titre, image, categorie, description, date } = highlightedEvent;

  return (
    <div className="highlight--global">
      <h2>{titre}</h2>
      <Link to={`/events/${highlightedEvent.id}`}>
        <img src={image} alt={titre} />
      </Link>
      <p>{description}</p>
      <p>{categorie}</p>
      <p>{date}</p>
    </div>
  );
}

export default Highlight;
