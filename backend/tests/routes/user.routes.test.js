/* eslint-env jest */

const request = require("supertest");
const express = require("express");
const userRoutes = require("../../src/router/user.routes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

// Importation de votre contrôleur
const userController = require("../../src/controllers/user.controller");

// Mock du contrôleur
jest.mock("../../src/controllers/user.controller");

// Vous pouvez réinitialiser vos mocks avant chaque test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("User Routes", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      name: "Test User",
      email: "test@example.com",
      password: "testpassword",
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

  // ... et ainsi de suite pour chaque route
});
