const express = require("express");

const router = express.Router();

// EVENTS
const eventRoutes = require("./event.routes");

router.use("/events", eventRoutes);

// CATEGORIES
const categorieRoutes = require("./categorie.routes");

router.use("/categories", categorieRoutes);

// USER
const userRoutes = require("./user.routes");

router.use("/users", userRoutes);

// AUTH
const authRoutes = require("./auth.routes");

router.use(authRoutes);

// UPLOADS
const uploadRoutes = require("./uploads.routes");

router.use("/uploads", uploadRoutes);

module.exports = router;
