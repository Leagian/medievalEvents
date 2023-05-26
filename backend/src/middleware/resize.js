const fs = require("fs");

const sharp = require("sharp");

const resizeImage = async (req, res, next) => {
  if (!req.file) {
    next(); // Passer à l'étape suivante si aucun fichier n'est présent
    return;
  }
  try {
    await sharp(req.file.path)
      .resize({ width: 1000, height: 700 })
      .toFile(`./public/uploads/resized_image/${req.file.filename}`);

    // Supprimer l'image originale après le redimensionnement
    fs.unlinkSync(req.file.path);

    next();
  } catch (error) {
    console.error("Error resizing image:", error);
    res.status(500).send("Error resizing image: ", error.message);
  }
};

const resizeAvatar = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("Erreur: Aucun avatar sélectionné!");
    return;
  }
  try {
    await sharp(req.file.path)
      .resize({ width: 500, height: 500 })
      .png()
      .toFile(`./public/uploads/resized_avatar/${req.file.filename}`);

    // Supprimer l'image originale après le redimensionnement
    fs.unlinkSync(req.file.path);

    next();
  } catch (error) {
    console.error("Error resizing avatar:", error);
    res.status(500).send("Error resizing avatar: ", error.message);
  }
};

module.exports = {
  resizeImage,
  resizeAvatar,
};
