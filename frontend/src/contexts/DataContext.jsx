import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

// eslint-disable-next-line react/prop-types
export function DataContextProvider({ children }) {
  const [dataEvents, setDataEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/events`)
      .then((response) => {
        setDataEvents(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataContext.Provider value={{ dataEvents, categories }}>
      {children}
    </DataContext.Provider>
  );
}
