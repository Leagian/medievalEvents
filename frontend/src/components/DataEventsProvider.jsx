import React, { useState, useEffect } from "react";
// import axios from "axios";
export const DataContext = React.createContext();

export function DataEventsProvider(props) {
  const [dataEvents, setDataEvents] = useState({
    title: "",
    image: "",
    category: "",
    text: "",
  });

  useEffect(() => {
    // todo api
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        setDataEvents(data[0]); // On récupère la première ligne de la table
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <DataContext.Provider value={dataEvents}>
      {/* {props.children} */}
    </DataContext.Provider>
  );
}

export default DataEventsProvider;
