import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Form from "../pages/Form";
import EventDetail from "../pages/EventDetail";
import Search from "../pages/Search";
import Contact from "../pages/Contact";

// import Map from "../pages/Map";

function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/map" element={<Map />} /> */}
      </Routes>
    </div>
  );
}

export default Main;
