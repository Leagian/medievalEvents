import PropTypes from "prop-types";

// COMPONENT
import EventList from "./EventList";

function SearchResults({ events }) {
  return (
    <div className="SearchResults">
      <EventList events={events} columns={2} />
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
