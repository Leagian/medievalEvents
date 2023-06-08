const express = require("express");

const {
  getAllEvents,
  getOneEvent,
  // getByCategory,
  deleteEvent,
  editEvent,
  createOneEvent,
} = require("../controllers/event.controller");

const authorization = require("../middleware/auth");

const { resizeImage } = require("../middleware/resize");

const admin = require("../middleware/admin");

const { uploadEvent } = require("../middleware/multer");

const router = express.Router();

// GET
router.get("/", getAllEvents); // affiche tous les events
router.get("/:id", getOneEvent); // event details

// POST
router.post(
  "/",
  authorization,
  uploadEvent.single("image"),
  resizeImage,
  createOneEvent
); // ajout event par user ou admin

// UPDATE
router.put(
  "/:id",
  authorization,
  uploadEvent.single("image"),
  resizeImage,
  admin,
  editEvent
); // modifier un event par l'admin

// DELETE
router.delete("/:id", authorization, admin, deleteEvent); // delete d'event par l'admin

module.exports = router;
