import { useDataContext } from "../contexts/DataContext";
import EventCard from "./EventCard";

function EventList() {
  const { dataEvents, filterApprovedEvents } = useDataContext();
  const approvedEvents = filterApprovedEvents(dataEvents); // filtre approved

  return (
    <div>
      <div className="allEvents--global">
        {approvedEvents.slice(0, 3).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            image={event.image}
            title={event.title}
            category={event.category}
            address={event.address}
            description={event.description}
            date={event.date}
          />
        ))}
      </div>
    </div>
  );
}

export default EventList;
