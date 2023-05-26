const {
  findOneUser,
  addOneUser,
  findUserFavorites,
  addFavoriteToUser,
  removeFavoriteFromUser,
  setUserAvatar,
} = require("../models/user.model");
const validateUser = require("../validator/user.validator");
const { hashPassword } = require("../helper/argon.helper");

const getOneUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (Number.isNaN(userId)) throw new Error();

    const [user] = await findOneUser(userId);

    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createOneUser = async (req, res) => {
  try {
    const errors = validateUser(req.body);

    if (errors) return res.status(401).send(errors);

    const hashedPassword = await hashPassword(req.body.password);

    const result = await addOneUser({ ...req.body, password: hashedPassword });

    res.status(201).send(result);
  } catch (error) {
    res.sendStatus(500);
  }
  return null;
};

const getUserFavorites = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    if (Number.isNaN(eventId)) throw new Error();

    const favorites = await findUserFavorites(eventId);

    res.send(favorites);
  } catch (error) {
    res.sendStatus(500);
  }
};

const addFavorite = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const { userId } = req;

    await addFavoriteToUser(userId, eventId);

    res.sendStatus(200);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "L'événement est déjà dans les favoris" });
    }
  }
  return null;
};

const removeFavorite = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const { userId } = req;

    await removeFavoriteFromUser(userId, eventId);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const AvatarUploadController = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (Number.isNaN(userId)) throw new Error("Invalid user ID");

    if (req.file === undefined) {
      res.status(400).send("Erreur: Aucun fichier sélectionné!");
      return;
    }

    const avatarPath = `/uploads/resized_avatar/${req.file.filename}`;

    await setUserAvatar(userId, avatarPath);

    // Envoi de l'URL de l'avatar avec la réponse
    res.send({
      message: "Avatar téléchargé avec succès!",
      avatarUrl: avatarPath,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getOneUser,
  createOneUser,
  getUserFavorites,
  addFavorite,
  removeFavorite,
  AvatarUploadController,
};
