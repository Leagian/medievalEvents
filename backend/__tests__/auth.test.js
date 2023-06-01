/* eslint-env jest */
process.env.TOKEN_SECRET = "test-secret-key";

const request = require("supertest");
const app = require("../src/app");
// const db = require("../src/models/db");
const authController = require("../src/controllers/auth.controller");
const { encodeJWT } = require("../src/helper/jwt.helper");

jest.mock("../src/controllers/auth.controller");

const agent = request.agent(app);

let authToken;

describe("Auth Routes", () => {
  beforeEach(async () => {
    // Générer un faux jeton d'authentification pour les tests
    authToken = encodeJWT({
      id: "100",
      name: "testJest",
      role: "admin",
    });
  });

  it("should log in a user", async () => {
    authController.login.mockImplementation((req, res) => {
      res.status(200).json({
        id: "100",
        username: "testJest",
        role: "admin",
        token: authToken,
      });
    });

    const res = await agent.post("/api/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should log out a user", async () => {
    authController.logout.mockImplementation((req, res) => {
      res.sendStatus(200);
    });

    const res = await agent
      .get("/api/logout")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
  });

  // afterAll(async () => {
  //   await db.end();
  // });
});
