import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function EventCard({ id, image, title, category, description, date, address }) {
  return (
    <div className="allEventsCards--global">
      <Link to={`/events/${id}`}>
        <img src={image} alt={title} />
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
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default EventCard;
