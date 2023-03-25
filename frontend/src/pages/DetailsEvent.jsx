import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/EventContext";

function DetailsEvent() {
  const { dataEvents } = useContext(DataContext);

  return (
    <div className="detailsEvent--global">
      {dataEvents.map((event) => (
        <div key={event.id}>
          <Link to={`/events/${event.id}`}>
            <img src={event.image} alt={event.titre} />
          </Link>
          <h1>{event.titre}</h1>
          <h2>{event.categorie}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DetailsEvent;
