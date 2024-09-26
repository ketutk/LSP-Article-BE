const express = require("express");
const router = express.Router();
const authRoute = require("./modules/auth/auth.route");
const articleRoute = require("./modules/article/article.route");

router.use("/auth", authRoute);
router.use("/article", articleRoute);

module.exports = router;
