import Discover from "../components/Discover";
import Highlight from "../components/Highlight";
import EventList from "../components/EventList";

function Home() {
  return (
    <div className="Home--global">
      <Discover />
      <Highlight />
      <EventList />
    </div>
  );
}

export default Home;
