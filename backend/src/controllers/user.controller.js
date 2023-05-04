const { findOneUser, addOneUser } = require("../models/user.model");
const validateUser = require("../validator/user.validator");
const { hashPassword } = require("../helper/argon.helper");

const getOneUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (Number.isNaN(userId)) throw new Error();

    const [user] = await findOneUser(userId);

    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createOneUser = async (req, res) => {
  try {
    const errors = validateUser(req.body);

    if (errors) {
      return res.sendStatus(401).send(errors);
    }

    const hashedPassword = await hashPassword(req.body.password);

    const result = await addOneUser({ ...req.body, password: hashedPassword });

    res.status(201).send(result);
  } catch (error) {
    res.sendStatus(500);
  }
  return null;
};

module.exports = { getOneUser, createOneUser };
