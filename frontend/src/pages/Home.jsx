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
      <Highlight />
      <EventList
        events={sortedEvents}
        limitEvents={4}
        limitedInfo
        columns={2}
      />
    </div>
  );
}

export default Home;
