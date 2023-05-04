const express = require("express");

const { getOneUser, createOneUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/:id", getOneUser);
router.post("/", createOneUser);

module.exports = router;
