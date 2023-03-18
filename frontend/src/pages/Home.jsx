import DataEventsProvider from "../components/DataEventsProvider";
import Header from "../components/Header";
import Discover from "../components/Discover";
import Highlight from "../components/Highlight";
import AllEvents from "../components/AllEvents";

function Home() {
  return (
    <div className="Home--global">
      <Header />
      <Discover />
      <Highlight />
      <DataEventsProvider>
        <AllEvents />
      </DataEventsProvider>
    </div>
  );
}

export default Home;
