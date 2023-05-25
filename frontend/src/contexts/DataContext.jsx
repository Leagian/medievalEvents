import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export function DataContextProvider({ children }) {
  const [dataEvents, setDataEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events`)
      .then((response) => {
        setDataEvents(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });
  }, []);

  // Fonction de filtrage des événements approuvés
  const filterApprovedEvents = (events) => {
    return events.filter((event) => event.isApproved === 1);
  };

  // Fonction de filtrage des événements non approuvés
  const filterNonApprovedEvents = (events) => {
    return events.filter((event) => event.isApproved === 0);
  };

  const value = useMemo(
    () => ({
      dataEvents,
      categories,
      filterApprovedEvents,
      filterNonApprovedEvents,
    }),
    [dataEvents, categories]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
