import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { userId } = useParams(); // Obtenez l'identifiant de l'utilisateur à partir de l'URL
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    // Faites une requête à votre backend pour obtenir tous les événements de l'utilisateur
    axios
      .get(`/users/${userId}/events`)
      .then((response) => setUserEvents(response.data))
      .catch((error) => console.error(error));
  }, [userId]);

  const handleEditEvent = (eventId) => {
    // Redirigez l'utilisateur vers la page de modification de l'événement
    // En utilisant l'identifiant de l'utilisateur et l'identifiant de l'événement
    // (vous devez mettre en place cette page dans votre application)
    window.location.href = `/users/${userId}/events/${eventId}/edit`;
  };

  return (
    <div>
      <h1>Profil de l'utilisateur {userId}</h1>
      <h2>Evénements ajoutés par l'utilisateur :</h2>
      {userEvents.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <button type="button" onClick={() => handleEditEvent(event.id)}>
            Modifier
          </button>
        </div>
      ))}
    </div>
  );
}

export default Profile;
