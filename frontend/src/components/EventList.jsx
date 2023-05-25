import PropTypes from "prop-types";
import { useDataContext } from "../contexts/DataContext";

// COMPONENT
import EventCard from "./EventCard";

function EventList({ events, limitEvents, limitedInfo }) {
  const { dataEvents, filterApprovedEvents } = useDataContext();

  // Utilise les événements passés par les props si disponibles, sinon utilise le contexte
  const eventsToShow = events || filterApprovedEvents(dataEvents);

  // Si limitEvents est passé, limite le nombre d'événements à afficher
  const limitedEvents = limitEvents
    ? eventsToShow.slice(0, limitEvents)
    : eventsToShow;

  return (
    <div>
      <div className="allEvents--global">
        {limitedEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            image={event.image}
            title={event.title}
            category={event.category}
            address={event.address}
            description={event.description}
            date={event.date}
            limitedInfo={limitedInfo}
          />
        ))}
      </div>
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ),
  limitEvents: PropTypes.number,
  limitedInfo: PropTypes.bool,
};

export default EventList;
