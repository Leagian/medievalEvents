/* eslint-env jest */

require("dotenv").config();
const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const loginRoutes = require("../../src/router/auth.routes");

const eventRoutes = require("../../src/router/event.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/login", loginRoutes);
app.use("/events", eventRoutes);

// Importation de votre contrôleur
const eventController = require("../../src/controllers/event.controller");
const loginController = require("../../src/controllers/auth.controller");

// Mock du contrôleur
jest.mock("../../src/controllers/event.controller");
jest.mock("../../src/controllers/auth.controller");

// Vous pouvez réinitialiser vos mocks avant chaque test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Event Routes", () => {
  let token;

  beforeAll(async () => {
    // Définir la réponse mock pour la fonction de login
    loginController.login.mockImplementation((req, res) => {
      res.status(200).json({ token });
    });

    const res = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });
    console.log("LOGIN :", res.body.token), (token = res.body.token); // affecter le token renvoyé par le login à votre variable token
    console.log("TOKEN : ", token);
  });

  it("should create a new event", async () => {
    // Mock de la méthode du contrôleur
    eventController.createOneEvent.mockImplementation((req, res) => {
      res.status(201).json({ id: "1" });
    });

    const res = await request(app)
      .post("/events")
      .set("Cookie", [`auth_token=${token}`])
      .send({
        id: "1",
        title: "LES MÉDIÉVALES D'HARCOURT",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should fetch a single event", async () => {
    // Mock de la méthode du contrôleur
    eventController.getOneEvent.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });

    const res = await request(app).get("/events/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should update an event", async () => {
    eventController.editEvent.mockImplementation((req, res) => {
      res.status(201).json({ id: "1" });
    });
    const res = await request(app)
      .put("/events/1")
      .set("Cookie", [`auth_token=${token}`])
      .send({
        id: "1",
        title: "LES MÉDIÉVALES D'HARCOURT",
      });
    expect(res.statusCode).toEqual(200);
  });

  it("should delete an event", async () => {
    eventController.deleteEvent.mockImplementation((req, res) => {
      res.status(201).json({ id: "1" });
    });

    const res = await request(app)
      .delete("/events/1")
      .set("Cookie", [`auth_token=${token}`]);

    expect(res.statusCode).toEqual(200);
  });

  it("should return all events", async () => {
    // Mock de la méthode du contrôleur
    eventController.getAllEvents.mockImplementation((req, res) => {
      res.status(200).json({ id: 1 });
    });
  });
  // ... et ainsi de suite pour chaque route
});
