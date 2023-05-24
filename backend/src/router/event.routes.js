const express = require("express");

const {
  getAllEvent,
  getOneEvent,
  getByCategory,
  deleteEvent,
  editEvent,
} = require("../controllers/event.controller");

const authorization = require("../middleware/auth");

const admin = require("../middleware/admin");

const { uploadEvent } = require("../middleware/multer");

const router = express.Router();

// GET
router.get("/", getAllEvent); // affiche tous les events
router.get("/:id", getOneEvent); // event details
router.get("/filter", getByCategory); // filter page

// UPDATE
router.put(
  "/:id",
  uploadEvent.single("image"),
  authorization,
  admin,
  editEvent
); // modifier un event par l'admin

// DELETE
router.delete("/:id", authorization, admin, deleteEvent); // delete d'event par l'admin

module.exports = router;
