import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function FavoriteEvents({ userEvents, handleOpenDialog }) {
  return (
    <div>
      <h2>Evénements Favoris :</h2>
      {userEvents.map((event) => {
        if (event.id) {
          return (
            <div key={event.id}>
              <Link to={`/events/${event.id}`}>
                <img src={event.image} alt={event.title} />
              </Link>
              <Link to={`/categories/${event.category}`}>
                <h5>{event.category}</h5>
              </Link>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.address}</p>
              <button type="submit" onClick={() => handleOpenDialog(event)}>
                Retirer des favoris
              </button>
            </div>
          );
        }
        return null; // Ignorer les objets sans clé
      })}
    </div>
  );
}

FavoriteEvents.propTypes = {
  userEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      address: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};

export default FavoriteEvents;
