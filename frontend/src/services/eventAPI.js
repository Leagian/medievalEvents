import axios from "axios";

const eventAPI = {
  delete: (eventId) =>
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`, {
      withCredentials: true,
    }),
  update: (eventId, formData) =>
    axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    ),
};

export default eventAPI;
