const db = require("./db");

const findOneUser = async (userId) => {
  try {
    const [user] = await db.query("SELECT * FROM `users` WHERE id = ?", [
      userId,
    ]);

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findByEmail = async (email) => {
  try {
    const [user] = await db.query("SELECT * FROM `users` WHERE email = ?", [
      email,
    ]);

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addOneUser = async (user) => {
  try {
    const { name, email, password, role = "user" } = user;

    const [result] = await db.query(
      "INSERT INTO `users` (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );

    return { id: result.insertId, name, email, role };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findUserFavorites = async (userId) => {
  try {
    const [result] = await db.query(
      `SELECT events.id, title, image, address, site, DATE_FORMAT(date, '%d/%m/%Y') as date, description, cat.cat_name as category
       FROM user_favorites
       INNER JOIN events ON user_favorites.event_id = events.id
       INNER JOIN categorie as cat ON cat.id = events.categorie_id
       WHERE user_favorites.user_id = ?`,
      [userId]
    );

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addFavoriteToUser = async (userId, eventId) => {
  try {
    const result = await db.query(
      `INSERT INTO user_favorites (user_id, event_id) VALUES (?, ?)`,
      [userId, eventId]
    );
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const removeFavoriteFromUser = async (userId, eventId) => {
  try {
    const result = await db.query(
      `DELETE FROM user_favorites WHERE user_id = ? AND event_id = ?`,
      [userId, eventId]
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  findOneUser,
  addOneUser,
  findByEmail,
  findUserFavorites,
  removeFavoriteFromUser,
  addFavoriteToUser,
};
