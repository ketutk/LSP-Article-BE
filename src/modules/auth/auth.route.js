const express = require("express");
const { middleware, isUser } = require("../../middleware/middleware");
const AuthController = require("./auth.controller");

const authController = new AuthController();

const router = express.Router();

/* GET home page. */
router.post("/login", authController.login);

module.exports = router;
