import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// COMPONENT
import EventImage from "./EventImage";

function SearchResults({ events }) {
  return (
    <div className="SearchResults">
      {events.map((event) => (
        <div className="SearchResults--item" key={event.id}>
          <h1>{event.title}</h1>
          <Link to={`/events/${event.id}`}>
            <EventImage image={event.image} alt={event.title} />
          </Link>
        </div>
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchResults;
