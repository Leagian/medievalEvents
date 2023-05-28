import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

// HELPER
import formatDate from "../helpers/DateHelper";

// SERVICE
import eventAPI from "../services/eventAPI";
import categoryAPI from "../services/categoryAPI";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export function DataContextProvider({ children }) {
  const [dataEvents, setDataEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchDataAPI = async () => {
      let eventsAPI = await eventAPI();
      eventsAPI = eventsAPI.map((event) => ({
        ...event,
        date: formatDate(event.date),
      }));
      setDataEvents(eventsAPI);

      const categoriesAPI = await categoryAPI();
      setCategories(categoriesAPI);
    };

    fetchDataAPI();
  }, []);

  // Fonction de filtrage des événements approuvés
  const filterApprovedEvents = (eventList) => {
    return eventList.filter((event) => event.isApproved === 1);
  };

  // Fonction de filtrage des événements non approuvés
  const filterNonApprovedEvents = (eventList) => {
    return eventList.filter((event) => event.isApproved === 0);
  };

  const value = useMemo(
    () => ({
      dataEvents,
      categories,
      filterApprovedEvents,
      filterNonApprovedEvents,
      events,
      setEvents,
    }),
    [dataEvents, categories, events]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
