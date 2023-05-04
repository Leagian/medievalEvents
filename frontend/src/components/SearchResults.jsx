import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function SearchResults({ events }) {
  return (
    <div className="SearchResults">
      {events.map((event) => (
        <div className="SearchResults--item" key={event.id}>
          <Link to={`/events/${event.id}`}>
            <img src={event.image} alt={event.title} />
          </Link>
          <h1>{event.title}</h1>
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
