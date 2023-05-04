const express = require("express");

const { getAllCat, getOneCat } = require("../controllers/categorie.controller");

const router = express.Router();

// GET
router.get("/", getAllCat);
router.get("/:id", getOneCat);

module.exports = router;
