// const express = require("express");

// const fs = require("fs");

// const sharp = require("sharp");

// const { uploadAvatar, uploadEvent } = require("../middleware/multer");

// const authorization = require("../middleware/auth");

// const { AvatarUploadController } = require("../controllers/user.controller");
// const { createOneEvent } = require("../controllers/event.controller");

// const router = express.Router();

// // Middleware pour le redimensionnement de l'image
// const resizeImage = async (req, res, next) => {
//   if (!req.file) {
//     res.status(400).send("Erreur: Aucun fichier sélectionné!");
//     return;
//   }
//   try {
//     await sharp(req.file.path)
//       .resize({ width: 600, height: 300 })
//       .toFile(`./public/uploads/resized_image/${req.file.filename}`);

//     // Supprimer l'image originale après le redimensionnement
//     fs.unlinkSync(req.file.path);

//     next();
//   } catch (error) {
//     console.error("Error resizing image:", error);
//     res.status(500).send("Error resizing image: ", error.message);
//   }
// };

// // Route pour créer un événement avec une image
// router.post(
//   "/",
//   authorization,
//   uploadEvent.single("image"),
//   resizeImage,
//   createOneEvent
// );

// router.post(
//   "/:id/avatar",
//   authorization,
//   uploadAvatar.single("avatar"),
//   AvatarUploadController,
//   async (req, res) => {
//     // Vérifier que l'ID dans l'URL correspond à l'utilisateur connecté
//     if (req.params.id !== req.userId) {
//       return res
//         .status(403)
//         .send("Forbidden: You can only update your own avatar.");
//     }

//     try {
//       await sharp(req.file.buffer)
//         .resize({ width: 500, height: 500 })
//         .png()
//         .toFile(`./public/uploads/resized_avatar/${req.file.originalname}`);
//       res.send("Avatar téléchargé et redimensionné avec succès!");
//     } catch (error) {
//       res
//         .status(500)
//         .send(
//           "Quelque chose s'est mal passé lors du téléchargement de l'avatar!"
//         );
//     }
//     return null;
//   }
// );

// module.exports = router;
