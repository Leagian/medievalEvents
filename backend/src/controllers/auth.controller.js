const { findByEmail } = require("../models/user.model");
const { verifyPassword } = require("../helper/argon.helper");
const { encodeJWT } = require("../helper/jwt.helper");
const validateLogin = require("../validator/login.validator");

const login = async (req, res) => {
  try {
    const errors = validateLogin(req.body);

    if (errors)
      return res.status(401).send({ message: "Validation failed", errors });

    const user = await findByEmail(req.body.email);

    if (!user) return res.status(401).send({ message: "Invalid email" });

    const passwordVerification = await verifyPassword(
      user.password,
      req.body.password
    );

    if (!passwordVerification)
      return res.status(401).send({ message: "Invalid password" });

    delete user.password;

    const token = encodeJWT(user);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false, // true en production
      sameSite: "strict", // use sameSite flag
    });

    res.status(200).json({ id: user.id, username: user.name, role: user.role });
  } catch (error) {
    console.error("Error in login function:", error);
    res.sendStatus(500);
  }
  return null;
};

const logout = async (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = { login, logout };
