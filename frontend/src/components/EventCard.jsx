import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// COMPONENT
import EventImage from "./EventImage";

function EventCard({ id, image, title, category, description, date, address }) {
  console.log("Image in EventCard:", image);
  console.log("Title in EventCard:", title);

  return (
    <div className="allEventsCards--global">
      <Link to={`/events/${id}`}>
        <EventImage image={image} alt={title} />
      </Link>
      <h1>{title}</h1>
      <Link to={`/categories/${category}`}>
        <h2>{category}</h2>
      </Link>
      <p>{description}</p>
      <p>{address}</p>
      <p>{date}</p>
    </div>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default EventCard;
