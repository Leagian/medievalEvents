import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// COMPONENT
import EventImage from "../components/EventImage";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

function CategoryEvents() {
  const [categoryEvents, setCategoryEvents] = useState([]);

  const { id: category } = useParams();

  const { dataEvents, filterApprovedEvents } = useDataContext();
  const filteredCategoryEvents = filterApprovedEvents(categoryEvents);

  useEffect(() => {
    const filteredEvents = dataEvents.filter(
      (event) => event.category === category
    );

    setCategoryEvents(filteredEvents);
  }, [dataEvents, category]);

  return (
    <div>
      <h1>{category.toUpperCase()}</h1>
      {filteredCategoryEvents.map((event) => (
        <div key={event.id}>
          <Link to={`/events/${event.id}`}>
            <EventImage image={event.image} alt={event.title} />
          </Link>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryEvents;
