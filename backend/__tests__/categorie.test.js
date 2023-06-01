/* eslint-env jest */
process.env.TOKEN_SECRET = "test-secret-key";

const request = require("supertest");
const app = require("../src/app");
// const db = require("../src/models/db");
const categorieController = require("../src/controllers/categorie.controller");

jest.mock("../src/controllers/categorie.controller");

describe("Categorie Routes", () => {
  it("should return all categories", async () => {
    categorieController.getAllCat.mockImplementation((req, res) => {
      res.status(200).json({ id: "1" });
    });
    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toEqual(200);
  });

  it("should return a categorie", async () => {
    categorieController.getOneCat.mockImplementation((req, res) => {
      res.status(200).json({ id: "1" });
    });
    const res = await request(app).get("/api/categories/1");

    expect(res.statusCode).toEqual(200);
  });

  // afterAll(async () => {
  //   await db.end();
  // });
});
