import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Highlight() {
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const getRandomId = Math.floor(Math.random() * 10) + 1;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events/${getRandomId}`)
      .then((res) => {
        setHighlightedEvent(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!highlightedEvent) {
    return <div>Loading...</div>;
  }

  const { id, title, image, category, description, date, address } =
    highlightedEvent;

  return (
    <div className="highlight--global">
      <h2>{title}</h2>
      <Link to={`/events/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <p>{description}</p>
      <p>{category}</p>
      <p>{address}</p>
      <p>{date}</p>
    </div>
  );
}

export default Highlight;
