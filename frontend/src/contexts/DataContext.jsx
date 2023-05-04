import axios from "axios";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

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

  const value = useMemo(
    () => ({ dataEvents, categories }),
    [dataEvents, categories]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
