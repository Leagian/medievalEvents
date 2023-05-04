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
    const { name, email, password } = user;

    const [result] = await db.query(
      "INSERT INTO `users` (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return { id: result.insertId, name, email };
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { findOneUser, addOneUser, findByEmail };
