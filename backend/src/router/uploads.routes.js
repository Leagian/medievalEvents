const express = require("express");

const sharp = require("sharp");

const { uploadAvatar, uploadEvent } = require("../middleware/multer");

const authorization = require("../middleware/auth");

const { AvatarUploadController } = require("../controllers/user.controller");

const router = express.Router();

// Middleware pour le redimensionnement de l'image
const resizeImage = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("Erreur: Aucun fichier sélectionné!");
    return;
  }
  try {
    await sharp(req.file.path)
      .resize({ width: 1000, height: 500 })
      .toFile(`./public/uploads/${req.file.filename}`);
    next();
  } catch (err) {
    res.status(500).send("Erreur lors du redimensionnement de l'image");
  }
};

router.post("/upload", uploadEvent.single("file"), resizeImage, (req, res) => {
  res.send("Fichier téléchargé et redimensionné avec succès!");
});

router.post(
  "/:id/avatar",

  uploadAvatar.single("avatar"),
  authorization,
  AvatarUploadController,
  async (req, res) => {
    // Vérifier que l'ID dans l'URL correspond à l'utilisateur connecté
    if (req.params.id !== req.userId) {
      return res
        .status(403)
        .send("Forbidden: You can only update your own avatar.");
    }

    try {
      await sharp(req.file.buffer)
        .resize({ width: 1000, height: 1000 })
        .png()
        .toFile(`./public/avatar/${req.file.originalname}`);
      res.send("Avatar téléchargé et redimensionné avec succès!");
    } catch (error) {
      res
        .status(500)
        .send(
          "Quelque chose s'est mal passé lors du téléchargement de l'avatar!"
        );
    }
    return null;
  }
);

module.exports = router;
