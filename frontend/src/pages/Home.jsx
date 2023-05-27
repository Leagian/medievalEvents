// MATERIAL
import { Box } from "@mui/material";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

// COMPONENT
import Discover from "../components/Discover";
import Highlight from "../components/Highlight";
import EventList from "../components/EventList";

function Home() {
  const { dataEvents, filterApprovedEvents } = useDataContext();
  const approvedEvents = filterApprovedEvents(dataEvents);

  const sortedEvents = [...approvedEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div>
      <Discover />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Highlight />
        <EventList events={sortedEvents} limitEvents={3} limitedInfo />
      </Box>
    </div>
  );
}

export default Home;
