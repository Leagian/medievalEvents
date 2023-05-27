import PropTypes from "prop-types";

// MATERIAL
import { Grid } from "@mui/material";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

// COMPONENT
import EventCard from "./EventCard";

function EventList({ events, limitEvents, limitedInfo, columns }) {
  const { dataEvents, filterApprovedEvents } = useDataContext();

  // Utilise les événements passés par les props si disponibles, sinon utilise le contexte
  const eventsToShow = events || filterApprovedEvents(dataEvents);

  // Si limitEvents est passé, limite le nombre d'événements à afficher
  const limitedEvents = limitEvents
    ? eventsToShow.slice(0, limitEvents)
    : eventsToShow;

  const columnWidth = columns === 2 ? 6 : 12;

  return (
    <Grid container spacing={3}>
      {limitedEvents.map((event) => (
        <Grid item xs={columnWidth} key={event.id}>
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
        </Grid>
      ))}
    </Grid>
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
  columns: PropTypes.number,
  limitEvents: PropTypes.number,
  limitedInfo: PropTypes.bool,
};

export default EventList;
