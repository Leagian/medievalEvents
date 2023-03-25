import Discover from "../components/Discover";
import Highlight from "../components/Highlight";
import AllEvents from "../components/AllEvents";

function Home() {
  return (
    <div className="Home--global">
      <Discover />
      <Highlight />
      <AllEvents />
    </div>
  );
}

export default Home;
