import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function EventCard({ id, image, titre, categorie, description, date }) {
  return (
    <div className="allEventsCards--global">
      <Link to={`/events/${id}`}>
        <img src={image} alt={titre} />
      </Link>
      <h1>{titre}</h1>
      <h2>{categorie}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  titre: PropTypes.string.isRequired,
  categorie: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default EventCard;
