const express = require("express");

const {
  getOneUser,
  createOneUser,
  getUserFavorites,
  removeFavorite,
  addFavorite,
  AvatarUploadController,
} = require("../controllers/user.controller");
const authorization = require("../middleware/auth");

const { uploadAvatar } = require("../middleware/multer");

const { resizeAvatar } = require("../middleware/resize");

const router = express.Router();

// GET
router.get("/:id", getOneUser); // get l'id d'un user
router.get("/:id/favorites", authorization, getUserFavorites);

// POST
router.post("/", createOneUser); // signup user
router.post("/:id/favorites", authorization, addFavorite); // ajout d'un event favori
router.post(
  "/:id/avatar",
  authorization,
  uploadAvatar.single("avatar"),
  resizeAvatar,
  AvatarUploadController
);

// DELETE
router.delete("/:id/favorites", authorization, removeFavorite); // delete des favoris

module.exports = router;
