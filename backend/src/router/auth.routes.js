const express = require("express");

const { login, logout } = require("../controllers/auth.controller");

const router = express.Router();

// GET
router.get("/logout", logout);

// POST
router.post("/login", login);

module.exports = router;
