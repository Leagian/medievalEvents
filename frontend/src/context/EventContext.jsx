import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const DataContext = createContext({});

function EventContext({ children }) {
  const [dataEvents, setDataEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => {
        setDataEvents(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <DataContext.Provider value={{ dataEvents }}>
      {children}
    </DataContext.Provider>
  );
}

export default EventContext;
