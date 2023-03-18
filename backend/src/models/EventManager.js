const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "event" });
  }

  findAllEvents() {
    return this.connection
      .query(`SELECT titre, image, adresse, site, date, description, categorie_id
    FROM ${this.table} 
    INNER JOIN categorie AS cat ON cat.id=event.cat_id`);
  }

  insert(event) {
    return this.connection.query(
      `INSERT INTO ${this.table} (titre, image, adresse, site, date, description, categorie_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        event.titre,
        event.image,
        event.adresse,
        event.site,
        event.date,
        event.description,
        event.categorie_id,
      ]
    );
  }

  update(event) {
    return this.connection.query(
      `UPDATE ${this.table} SET titre = ?, image = ?, adresse = ?, site = ?, date = ?, description = ?, categorie_id = ? WHERE id = ?`,
      [
        event.titre,
        event.image,
        event.adresse,
        event.site,
        event.date,
        event.description,
        event.categorie_id,
        event.id,
      ]
    );
  }
}

module.exports = EventManager;
