const express = require("express");

const {
  getAllEvent,
  getOneEvent,
  getByCategory,
  createOneEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const authorization = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// GET
router.get("/", getAllEvent); // affiche tous les events
router.get("/:id", getOneEvent); // event details
router.get("/filter", getByCategory); // filter page

// POST
router.post("/form", authorization, createOneEvent); // ajout d'un event

// DELETE
router.delete("/:id", admin, deleteEvent); // delete d'event par l'admin

module.exports = router;
