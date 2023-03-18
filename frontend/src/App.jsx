import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajouter" element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default App;
