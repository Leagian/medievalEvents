const db = require("./db");

const findAllEvents = async () => {
  try {
    const [events] =
      await db.query(`SELECT events.id, title, image, address, site, DATE_FORMAT(date, '%d/%m/%Y') as date, description, categorie_id
    FROM events AS events
    INNER JOIN categorie AS cat ON cat.id=events.categorie_id`);

    return events;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findOneEvent = async (id) => {
  try {
    const [event] = await db.query(
      `SELECT id, title, image, address, site, DATE_FORMAT(date, '%d/%m/%Y') as date, description, categorie_id from events WHERE id = ?`,
      [id]
    );

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findByCategory = async (categoryId) => {
  try {
    const [event] = await db.query(
      `SELECT events.id, title, image, address, site, DATE_FORMAT(date, '%d/%m/%Y') as date, description, categorie_id
 FROM events AS events
    INNER JOIN categorie AS cat ON cat.id=events.categorie_id
     WHERE events.categorie_id = ?`,
      [categoryId]
    );

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addOneEvent = async (events, connection, table) => {
  try {
    const result = await connection.query(
      `INSERT INTO ${table} (title, image, address, site, date, description, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        events.title,
        events.image,
        events.address,
        events.site,
        events.date,
        events.description,
        events.categorie_id,
      ]
    );
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteOneEvent = async (id) => {
  try {
    const result = await db.query("DELETE FROM events WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  findAllEvents,
  findOneEvent,
  findByCategory,
  addOneEvent,
  deleteOneEvent,
};
