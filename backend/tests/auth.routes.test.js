/* eslint-env jest */
process.env.TOKEN_SECRET = "test-secret-key";

const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models/db");

describe("Login process", () => {
  it("should return a JWT token when given valid credentials", async () => {
    const response = await request(app).post("/api/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();

    const authToken = response.headers["set-cookie"].find((cookie) =>
      cookie.startsWith("auth_token")
    );

    expect(authToken).toBeDefined();
  });

  afterAll(async () => {
    // Fermer toutes les connexions à la base de données après tous les tests.
    await db.end();
  });
});
