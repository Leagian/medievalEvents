import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function EventCard({
  id,
  image,
  title,
  categorie,
  description,
  date,
  address,
}) {
  return (
    <div className="allEventsCards--global">
      <Link to={`/events/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <h1>{title}</h1>
      <h2>{categorie}</h2>
      <p>{description}</p>
      <p>{date}</p>
      <p>{address}</p>
    </div>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  categorie: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default EventCard;
