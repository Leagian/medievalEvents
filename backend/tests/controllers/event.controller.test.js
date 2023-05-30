/* eslint-env jest */

const request = require("supertest");
const app = require("../../src/app");
const { getAllEvents } = require("../../src/controllers/event.controller");

jest.mock("../src/controllers/event.controller");

describe("GET /", () => {
  it("should return all events", async () => {
    const mockEvents = [
      { id: 1, title: "Event 1" },
      { id: 2, title: "Event 2" },
    ];

    getAllEvents.mockResolvedValue(mockEvents);

    const res = await request(app).get("/api/events");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockEvents);
  });

  it("should return a 500 error if there is a problem", async () => {
    getAllEvents.mockImplementation(() => {
      throw new Error();
    });

    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(500);
  });
});
