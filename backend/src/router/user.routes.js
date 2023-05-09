const express = require("express");

const {
  getOneUser,
  createOneUser,
  getUserFavorites,
  removeFavorite,
  addFavorite,
} = require("../controllers/user.controller");
const authorization = require("../middleware/auth");

const router = express.Router();

// GET
router.get("/:id", getOneUser); // recup l'id d'un user
router.get("/:id/favorites", authorization, getUserFavorites);

// POST
router.post("/", createOneUser); // signup user
router.post("/:id/favorites", authorization, addFavorite); // ajout d'un event favori

// DELETE
router.delete("/:id/favorites", authorization, removeFavorite); // enlever des favoris

module.exports = router;
