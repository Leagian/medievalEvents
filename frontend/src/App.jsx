import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Main from "./components/Main";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Form from "./pages/Form";
import EventDetail from "./pages/EventDetail";
import SearchEvents from "./pages/SearchEvents";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import Admin from "./pages/Admin";

import "./App.css";

import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events" element={<SearchEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<Map />} />
        <Route
          element={
            <ProtectedRoute
              user={user}
              requiredRoles={["user"]}
              redirectPath="/"
            />
          }
        >
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              user={user}
              requiredRoles={["admin"]}
              redirectPath="/"
            />
          }
        >
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              user={user}
              requiredRoles={["user", "admin"]}
              redirectPath="/"
            />
          }
        >
          <Route path="/form" element={<Form />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
