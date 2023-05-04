const express = require("express");

const { login, logout } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/logout", logout);
router.post("/login", login);

module.exports = router;
