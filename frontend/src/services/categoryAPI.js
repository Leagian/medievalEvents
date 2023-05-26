import axios from "axios";

const categoryAPI = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/categories`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return [];
  }
};

export default categoryAPI;
