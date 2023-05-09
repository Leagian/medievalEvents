import axios from "axios";

const eventAPI = {
  delete: (eventId) =>
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`),
};

export default eventAPI;
