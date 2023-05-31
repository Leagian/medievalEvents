/* eslint-env jest */

const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models/db");
const userRoutes = require("../src/router/user.routes");

// Importation de votre contrôleur
const userController = require("../src/controllers/user.controller");

// Mock du contrôleur
jest.mock("../../src/controllers/user.controller");

// Vous pouvez réinitialiser vos mocks avant chaque test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("User Routes", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "anne",
      email: "admin@example.com",
      password: "admin",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should fetch a single user", async () => {
    // Mock de la méthode du contrôleur
    userController.getOneUser.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await request(app).get("/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should add an event to the favorites", async () => {
    userController.addFavorite.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await request(app)
      .post("/users/1/favorites")
      .send({ eventId: 1 });
    expect(res.statusCode).toEqual(201);
  });

  it("should remove an event from the favorites", async () => {
    userController.removeFavoriteFromUser.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await request(app)
      .delete("/users/1/favorites")
      .send({ eventId: 1 });
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    // Fermer toutes les connexions à la base de données après tous les tests.
    await db.end();
  });
});
