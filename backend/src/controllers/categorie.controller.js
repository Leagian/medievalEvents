const { findAllCat, findOneCat } = require("../models/categorie.model");

const getAllCat = async (req, res) => {
  try {
    const events = await findAllCat();

    res.send(events);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOneCat = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    if (Number.isNaN(eventId)) throw new Error();

    const [events] = await findOneCat(eventId);

    res.send(events);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { getAllCat, getOneCat };
