import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Form from "./pages/Form";
import EventDetail from "./pages/EventDetail";
import SearchEvents from "./pages/SearchEvents";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import CategoryEvents from "./pages/CategoryEvents";

import "./App.css";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { user } = useAuthContext();
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
