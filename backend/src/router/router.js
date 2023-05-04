const express = require("express");

const router = express.Router();

// ADMIN ROUTES
// const adminController = require("../controllers/admin.controller");
// const isAdmin = require("../middlewares/isAdmin");

// router.get("/events/pending", isAdmin, adminController.getPendingEvents);
// router.patch("/events/:id/status", isAdmin, adminController.updateEventStatus);

// EVENTS
const eventRoutes = require("./event.routes");

router.use("/events", eventRoutes);

// CATEGORIES
const categorieRoutes = require("./categorie.routes");

router.use("/categories", categorieRoutes);

// USER
const userRoutes = require("./user.routes");

router.use("/users", userRoutes);

module.exports = router;
