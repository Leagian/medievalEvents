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
      try {
        let eventsAPI = await eventAPI.getAll();
        eventsAPI = eventsAPI.map((event) => ({
          ...event,
          date: formatDate(event.date),
        }));
        setDataEvents(eventsAPI);

        const categoriesAPI = await categoryAPI.getAll();
        setCategories(categoriesAPI);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
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

  const handleApproveChange = (eventId, newApprovalState) => {
    // Find the event in the state
    const eventToUpdate = dataEvents.find((event) => event.id === eventId);
    if (!eventToUpdate) {
      console.error("Event not found:", eventId);
      return;
    }

    // Update the event with the new approval state
    const updatedEvent = { ...eventToUpdate, isApproved: newApprovalState };

    // Construct FormData
    const formData = new FormData();
    Object.entries(updatedEvent).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Update the event in the database
    eventAPI
      .update(eventId, formData)
      .then(() => {
        // If successful, update the state of the events
        setDataEvents(
          dataEvents.map((event) =>
            event.id === eventId ? updatedEvent : event
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const value = useMemo(
    () => ({
      dataEvents,
      categories,
      filterApprovedEvents,
      filterNonApprovedEvents,
      events,
      setEvents,
      handleApproveChange,
    }),
    [dataEvents, categories, events]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
