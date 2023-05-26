import axios from "axios";

const eventAPI = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/events`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return [];
  }
};

export default eventAPI;
