const express = require("express");

const {
  getAllEvent,
  getOneEvent,
  getByCategory,
  createOneEvent,
  deleteEvent,
  editEvent,
} = require("../controllers/event.controller");
const authorization = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// GET
router.get("/", getAllEvent); // affiche tous les events
router.get("/:id", getOneEvent); // event details
router.get("/filter", getByCategory); // filter page

// POST
router.post("/", authorization, createOneEvent); // ajout d'un event

// UPDATE
router.put("/:id", authorization, admin, editEvent); // modifier un event par l'admin

// DELETE
router.delete("/:id", authorization, admin, deleteEvent); // delete d'event par l'admin

module.exports = router;
