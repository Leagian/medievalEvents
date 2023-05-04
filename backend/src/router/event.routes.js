const express = require("express");

const {
  getAllEvent,
  getOneEvent,
  getByCategory,
  createOneEvent,
} = require("../controllers/event.controller");

const router = express.Router();

// GET
router.get("/", getAllEvent);
router.get("/:id", getOneEvent);
router.get("/filter", getByCategory);

// POST
router.post("/", createOneEvent);

module.exports = router;
