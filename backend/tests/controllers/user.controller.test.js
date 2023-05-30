/* eslint-env jest */

const { getOneUser } = require("../../src/controllers/user.controller");

describe("User Controller", () => {
  it("should fetch a user", async () => {
    const req = {
      params: { id: "1" },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Ici, vous devriez mocker le comportement de votre modèle
    jest.mock("../models/user.model", () => ({
      findOneUser: jest.fn().mockResolvedValue({
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "user",
      }),
    }));

    await getOneUser(req, res);

    expect(res.send).toHaveBeenCalledWith({
      id: 1,
      name: "Test User",
      email: "test@example.com",
      role: "user",
    });
  });
});
