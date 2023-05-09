const express = require("express");

// UPLOAD PHOTO
const fs = require("fs");

const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "./public/uploads/" });

const { v4: uuidv4 } = require("uuid");

// route POST pour recevoir un fichier
router.post("/events/image", upload.single("image"), (req, res) => {
  // On récupère le nom du fichier
  const { originalname } = req.file;
  // On récupère le nom du fichier
  const { filename } = req.file;
  // On utilise la fonction rename de fs pour renommer le fichier
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;

      res.send("File uploaded");
    }
  );
});