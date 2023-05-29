import axios from "axios";

const eventAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/events`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    }
  },
  getOne: (eventId) =>
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`, {
      withCredentials: true,
    }),
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
