const db = require("./db");

const findAllEvents = async () => {
  try {
    const [events] =
      await db.query(`SELECT events.id, title, image, address, site, DATE_FORMAT(date, '%Y-%m-%d') as date, description, cat.id as category_id, cat.cat_name as category, isApproved
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
      `SELECT events.id, title, image, address, site, DATE_FORMAT(date, '%Y-%m-%d') as date, description, cat.id as category_id, cat.cat_name as category, isApproved
      FROM events
      INNER JOIN categorie AS cat ON cat.id=events.categorie_id
      WHERE events.id = ?`,
      [id]
    );

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// const findByCategory = async (categoryId) => {
//   try {
//     const [event] = await db.query(
//       `SELECT events.id, title, image, address, site, DATE_FORMAT(date, '%Y-%m-%d') as date, description, cat.id as category_id,  cat.cat_name as category, isApproved FROM events AS events
//     INNER JOIN categorie AS cat ON cat.id=events.categorie_id
//      WHERE events.categorie_id = ?`,
//       [categoryId]
//     );

//     return event;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

const addOneEvent = async (events) => {
  try {
    const result = await db.query(
      `INSERT INTO events (title, address, date, description, categorie_id) VALUES (?, ?, ?, ?, ?)`,
      [
        events.title,
        events.address,
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

const editOneEvent = async (id, event) => {
  try {
    const result = await db.query(
      "UPDATE events SET title = ?, image = ?, address = ?, site = ?, date = ?, description = ?, categorie_id = ?, isApproved = ? WHERE id = ?",
      [
        event.title,
        event.image,
        event.address,
        event.site,
        event.date,
        event.description,
        event.categorie_id,
        event.isApproved,
        id,
      ]
    );

    if (result.affectedRows === 0) return null;

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  findAllEvents,
  findOneEvent,
  // findByCategory,
  addOneEvent,
  deleteOneEvent,
  editOneEvent,
};
