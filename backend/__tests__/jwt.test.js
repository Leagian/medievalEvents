/* eslint-env jest */
process.env.TOKEN_SECRET = "test-secret-key";
const { encodeJWT, decodeJWT } = require("../src/helper/jwt.helper");

describe("JWT functions", () => {
  it("should correctly encode and decode a payload", () => {
    const payload = { user: "admin" };
    const token = encodeJWT(payload);

    const decodedPayload = decodeJWT(token);

    expect(decodedPayload).toEqual(expect.objectContaining(payload));
  });
});
