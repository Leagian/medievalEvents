import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Form from "../pages/Form";
import EventDetail from "../pages/EventDetail";
import SearchEvents from "../pages/SearchEvents";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";

// import Map from "../pages/Map";

function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events" element={<SearchEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/:userId" component={Profile} />
        {/* <Route path="/map" element={<Map />} /> */}
      </Routes>
    </div>
  );
}

export default Main;
