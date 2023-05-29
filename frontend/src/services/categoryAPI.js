import axios from "axios";

const categoryAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      return [];
    }
  },
};

export default categoryAPI;
