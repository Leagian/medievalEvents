import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// COMPONENT
import EventImage from "./EventImage";

function EventCard({
  id,
  image,
  title,
  category,
  description,
  date,
  address,
  limitedInfo = false,
}) {
  return (
    <div className="allEventsCards--global">
      <h1>{title}</h1>
      <Link to={`/events/${id}`}>
        <EventImage image={image} alt={title} />
      </Link>
      {limitedInfo && (
        <>
          <Link to={`/categories/${category}`}>
            <h4>{category}</h4>
          </Link>
          <p>{description}</p>
          <p>{address}</p>
          <p>{date}</p>
        </>
      )}
    </div>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  limitedInfo: PropTypes.bool,
};

export default EventCard;
