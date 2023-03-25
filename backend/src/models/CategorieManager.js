const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "categorie" });
  }

  findAllCat() {
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  findOneCat(id) {
    return this.connection.query(`SELECT * from  ${this.table} WHERE id = ?`, [
      id,
    ]);
  }
}
module.exports = EventManager;
