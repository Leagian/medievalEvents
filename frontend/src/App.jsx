import { Routes, Route } from "react-router-dom";

// MATERIAL
import { Box } from "@mui/material";

// COMPONENT
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// PAGES
import Home from "./pages/Home";
import Form from "./pages/Form";
import EventDetail from "./pages/EventDetail";
import SearchEvents from "./pages/SearchEvents";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import CategoryEvents from "./pages/CategoryEvents";

import "./App.css";

// CONTEXT
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box
          sx={{
            flex: "1",
            overflow: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:id" element={<CategoryEvents />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events" element={<SearchEvents />} />
            <Route path="/contact" element={<Contact />} />
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
        </Box>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
