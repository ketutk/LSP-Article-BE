const express = require("express");
const { middleware } = require("../../middleware/middleware");
const ArticleController = require("./article.controller");
const articleController = new ArticleController();

const router = express.Router();

/* GET home page. */
router.post("/", middleware, articleController.addArticle);
router.put("/status/:id", middleware, articleController.publishArticleById);
router.put("/:id", middleware, articleController.editArticleById);
router.delete("/:id", middleware, articleController.deleteArticleById);
router.get("/", middleware, articleController.getAllArticle);
router.get("/published", articleController.getAllPublishedArticle);
router.get("/:id", middleware, articleController.getArticleById);
router.get("/published/:id", middleware, articleController.getPublishedArticleById);

module.exports = router;
