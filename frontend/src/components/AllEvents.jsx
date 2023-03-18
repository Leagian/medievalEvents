import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataEventsProvider";

function AllEvents() {
  const data = useContext(DataContext);

  return (
    <div className="AllEvents--global">
      {data.map((event) => (
        <div key={event.id}>
          <Link to={`/events/${event.id}`}>
            <img src={event.image} alt={event.title} />
          </Link>
          <h1>{event.title}</h1>
          <h2>{event.category}</h2>
          <p>{event.text}</p>
        </div>
      ))}
    </div>
  );
}

export default AllEvents;
