/* eslint-env jest */
process.env.TOKEN_SECRET = "test-secret-key";

const request = require("supertest");
const app = require("../src/app");
// const db = require("../src/models/db");
const userController = require("../src/controllers/user.controller");
const { encodeJWT } = require("../src/helper/jwt.helper");

// Mock du contrôleur
jest.mock("../src/controllers/user.controller");

const agent = request.agent(app);

let authToken;

// Vous pouvez réinitialiser vos mocks avant chaque test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Event Routes", () => {
  beforeEach(async () => {
    // Générer un faux jeton d'authentification pour les tests
    authToken = encodeJWT({
      id: "100",
      name: "testJest",
      role: "admin",
    });
  });

  it("should create a new user", async () => {
    userController.createOneUser.mockImplementation((req, res) => {
      res.status(201).json({ id: "1" });
    });
    const res = await agent.post("/api/users").send({
      name: "josette",
      email: "josette@example.com",
      password: "testPassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should fetch a single user", async () => {
    userController.getOneUser.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await agent.get("/api/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should add an event to the favorites", async () => {
    userController.addFavorite.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await agent
      .post("/api/users/1/favorites")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ id: 1 });
    expect(res.statusCode).toEqual(200);
  });

  it("should remove an event from the favorites", async () => {
    userController.removeFavorite.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await request(app)
      .delete("/api/users/1/favorites")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ id: 1 });
    expect(res.statusCode).toEqual(200);
  });

  it("should return events from the favorites", async () => {
    userController.getUserFavorites.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await request(app)
      .get("/api/users/1/favorites")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ id: 1 });
    expect(res.statusCode).toEqual(200);
  });

  it("should upload an avatar", async () => {
    userController.AvatarUploadController.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const avatarPath = "__test__/mocks/testImage.png";

    const res = await request(app)
      .post("/api/users/1/avatar")
      .set("Authorization", `Bearer ${authToken}`)
      .attach("avatar", avatarPath);
    expect(res.statusCode).toEqual(200);
  });

  // afterAll(async () => {
  //   await db.end();
  // });
});
