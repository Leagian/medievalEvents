import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetail() {
  const [eventId, setEventId] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/events/${id}`)
      .then((res) => {
        setEventId(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [id]);

  return (
    <div className="detailsEvent--global">
      <div key={eventId.id}>
        <img src={eventId.image} alt={eventId.titre} />
        <h1>{eventId.titre}</h1>
        <h2>{eventId.categorie}</h2>
        <p>{eventId.description}</p>
        <p>{eventId.date}</p>
      </div>
    </div>
  );
}

export default EventDetail;
