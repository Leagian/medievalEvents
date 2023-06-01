/* eslint-env jest */
process.env.TOKEN_SECRET = "test-secret-key";

const request = require("supertest");
const app = require("../src/app");
// const db = require("../src/models/db");
const eventController = require("../src/controllers/event.controller");
const { encodeJWT } = require("../src/helper/jwt.helper");

jest.mock("../src/controllers/event.controller");

const agent = request.agent(app);

let authToken;

describe("Event Routes", () => {
  beforeEach(async () => {
    // Générer un faux jeton d'authentification pour les tests
    authToken = encodeJWT({
      id: "100",
      name: "testJest",
      role: "admin",
    });
  });

  it("should create a new event", async () => {
    eventController.createOneEvent.mockImplementation((req, res) => {
      res.status(201).json({ id: "1" });
    });
    const res = await agent
      .post("/api/events")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        id: "1",
        title: "LES MÉDIÉVALES D'HARCOURT",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should fetch a single event", async () => {
    eventController.getOneEvent.mockImplementation((req, res) => {
      res.status(200).json({ id: "1" });
    });
    const res = await agent.get("/api/events/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should update an event", async () => {
    eventController.editEvent.mockImplementation((req, res) => {
      res.status(200).json({ id: "1" });
    });
    const res = await agent
      .put("/api/events/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        id: "1",
        title: "LES MÉDIÉVALES D'HARCOURT",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should delete an event", async () => {
    eventController.deleteEvent.mockImplementation((req, res) => {
      res.status(200).json({ id: "1" });
    });
    const res = await agent
      .delete("/api/events/1")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it("should return all events", async () => {
    eventController.getAllEvents.mockImplementation((req, res) => {
      res.status(200).json([{ id: "1" }, { id: "2" }]);
    });
    const res = await agent.get("/api/events");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  // afterAll(async () => {
  //   await db.end();
  // });
});
