import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

function CategoryEvents() {
  const [categoryEvents, setCategoryEvents] = useState([]);
  const { id: category } = useParams();
  const { dataEvents } = useDataContext();

  useEffect(() => {
    const filteredEvents = dataEvents.filter(
      (event) => event.category === category
    );

    setCategoryEvents(filteredEvents);
  }, [dataEvents, category]);

  return (
    <div>
      <h1>{category.toUpperCase()}</h1>
      {/* Affichez les événements de la catégorie */}
      {categoryEvents.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          {/* Affichez d'autres détails de l'événement si nécessaire */}
        </div>
      ))}
    </div>
  );
}

export default CategoryEvents;
