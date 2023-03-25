import React, { useContext } from "react";
import { DataContext } from "../context/EventContext";
import AllEventsCards from "./AllEventsCards";

function AllEvents() {
  const { dataEvents } = useContext(DataContext);

  return (
    <div className="AllEvents--global">
      {dataEvents.map((elem) => (
        <AllEventsCards
          key={elem.id}
          image={elem.image}
          titre={elem.titre}
          categorie={elem.categorie}
          description={elem.description}
          date={elem.date}
        />
      ))}
    </div>
  );
}

export default AllEvents;
