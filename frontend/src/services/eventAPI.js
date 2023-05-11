import axios from "axios";

const eventAPI = {
  delete: (eventId) =>
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`, {
      withCredentials: true,
    }),
  update: (eventId, updatedEvent) =>
    axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`,
      updatedEvent,
      { withCredentials: true }
    ),
};

export default eventAPI;
