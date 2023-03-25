const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "events" });
  }

  findAllEvents() {
    return this.connection.query(`
      SELECT events.id, titre, image, adresse, site, DATE_FORMAT(date, '%d/%m/%Y') as date, description, categorie_id
      FROM ${this.table} AS events
      INNER JOIN categorie AS cat ON cat.id=events.categorie_id
    `);
  }

  insert(events) {
    return this.connection.query(
      `INSERT INTO ${this.table} (titre, image, adresse, site, date, description, categorie_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        events.titre,
        events.image,
        events.adresse,
        events.site,
        events.date,
        events.description,
        events.categorie_id,
      ]
    );
  }

  findOneEvent(id) {
    return this.connection.query(
      `SELECT titre, image, adresse, site, DATE_FORMAT(date, '%d/%m/%Y') as date, description, categorie_id from  ${this.table} WHERE id = ?`,
      [id]
    );
  }

  update(events) {
    return this.connection.query(
      `UPDATE ${this.table} SET titre = ?, image = ?, adresse = ?, site = ?, date = ?, description = ?, categorie_id = ? WHERE id = ?`,
      [
        events.titre,
        events.image,
        events.adresse,
        events.site,
        events.date,
        events.description,
        events.categorie_id,
        events.id,
      ]
    );
  }
}

module.exports = EventManager;
