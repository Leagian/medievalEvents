import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

import profileAPI from "../services/profileAPI";

function Profile() {
  const [userEvents, setUserEvents] = useState([]);

  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    // Faites une requête à votre backend pour obtenir tous les événements de l'utilisateur
    profileAPI
      .get(`/api/users/${id}/favorites`)
      .then((response) => setUserEvents(response.data))
      .catch((error) => console.error(error));
  }, [user]);

  const handleRemoveFromFavorites = (eventToRemove) => {
    profileAPI
      .delete(`/api/users/${eventToRemove.id}/favorites`)
      .then(() => {
        // Mettez à jour la liste des événements de l'utilisateur en enlevant l'événement supprimé
        setUserEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventToRemove.id)
        );
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'événement des favoris :",
          error
        );
      });
  };

  return (
    <div>
      <h1>
        Hello, {user.username} {user.id}
      </h1>
      <h2>Evénements ajoutés par l'utilisateur :</h2>
      {userEvents.map((event) => {
        if (event.id) {
          return (
            <div key={event.id}>
              <Link to={`/events/${event.id}`}>
                <img src={event.image} alt={event.title} />
              </Link>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <button
                type="submit"
                onClick={() => handleRemoveFromFavorites(event)}
              >
                Retirer des favoris
              </button>
            </div>
          );
        }
        return null; // Ignorer les objets sans clé
      })}
      <Outlet />
    </div>
  );
}

export default Profile;
