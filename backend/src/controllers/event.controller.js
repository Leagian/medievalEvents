const {
  findAllEvents,
  findOneEvent,
  findByCategory,
  addOneEvent,
  deleteOneEvent,
  editOneEvent,
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

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteOneEvent(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the event" });
  }
  return null;
};

const editEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const event = req.body;

    if (Number.isNaN(eventId)) throw new Error();

    const result = await editOneEvent(eventId, event);
    if (!result) throw new Error();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllEvent,
  getOneEvent,
  getByCategory,
  createOneEvent,
  deleteEvent,
  editEvent,
};
