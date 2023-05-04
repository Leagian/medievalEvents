const db = require("./db");

const findAllCat = async () => {
  try {
    const [categorie] = await db.query(`SELECT *
    FROM categorie`);

    return categorie;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findOneCat = async (id) => {
  try {
    const [categorie] = await db.query(`SELECT * from categorie WHERE id = ?`, [
      id,
    ]);

    return categorie;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { findAllCat, findOneCat };
