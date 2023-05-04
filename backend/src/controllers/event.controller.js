const {
  findAllEvents,
  findOneEvent,
  findByCategory,
  addOneEvent,
} = require("../models/event.model");

const getAllEvent = async (req, res) => {
  try {
    const events = await findAllEvents();

    res.send(events);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOneEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    if (Number.isNaN(eventId)) throw new Error();

    const [events] = await findOneEvent(eventId);

    res.send(events);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getByCategory = async (req, res) => {
  try {
    const events = await findByCategory(req.query.categoryId);

    res.send(events);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createOneEvent = async (req, res) => {
  const event = req.body;

  // TODO validations (length, format...)

  try {
    const [result] = await addOneEvent(event);
    res.location(`/events/${result.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = { getAllEvent, getOneEvent, getByCategory, createOneEvent };
