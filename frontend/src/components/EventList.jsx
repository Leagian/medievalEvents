import PropTypes from "prop-types";

// MATERIAL
import { Grid } from "@mui/material";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

// COMPONENT
import EventCard from "./EventCard";

function EventList({
  events,
  limitEvents,
  columns,
  showCat,
  showDesc,
  showAddress,
  showDate,
}) {
  const { dataEvents, filterApprovedEvents } = useDataContext();

  // Utilise les événements passés par les props si disponibles, sinon utilise le contexte
  const eventsToShow = events || filterApprovedEvents(dataEvents);

  // Si limitEvents est passé, limite le nombre d'événements à afficher
  const limitedEvents = limitEvents
    ? eventsToShow.slice(0, limitEvents)
    : eventsToShow;

  const columnWidth = columns === 2 ? 6 : 12;

  return (
    <Grid container style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {limitedEvents.map((event) => (
        <Grid item xs={columnWidth} key={event.id}>
          <EventCard
            id={event.id}
            title={event.title}
            image={event.image}
            description={event.description}
            category={event.category}
            date={event.date}
            address={event.address}
            showCat={showCat}
            showDesc={showDesc}
            showAddress={showAddress}
            showDate={showDate}
            columns={columns}
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
  showCat: PropTypes.bool,
  showDesc: PropTypes.bool,
  showAddress: PropTypes.bool,
  showDate: PropTypes.bool,
};

export default EventList;
