import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import DetailsEvent from "./pages/DetailsEvent";
import SearchEvents from "./pages/SearchEvents";

import DataEventsProvider from "./context/EventContext";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <DataEventsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulaire" element={<AddEvent />} />
          <Route path="/events/:id" element={<DetailsEvent />} />
          <Route path="/events" element={<SearchEvents />} />
        </Routes>
      </DataEventsProvider>
    </div>
  );
}

export default App;
