const { response } = require("../../helper/response");
const ArticleService = require("./article");
const { ArticleSchema } = require("./article.validation");

const articleService = new ArticleService();

class ArticleController {
  async addArticle(req, res, next) {
    try {
      const result = ArticleSchema.safeParse(req.body);

      if (!result.success) throwError(400, result.error.issues);

      result.data.user = req.user_data;

      const data = await articleService.addArticle({ image: req.files.image, ...result.data });

      return response(res, 201, data, "Berhasil membuat artikel");
    } catch (e) {
      next(e);
    }
  }

  async editArticleById(req, res, next) {
    try {
      const { id } = req.params;
      const result = ArticleSchema.safeParse(req.body);

      if (!result.success) throwError(400, result.error.issues);

      const data = await articleService.editArticleById({ id, image: req?.files?.image, ...result.data });

      return response(res, 200, data, "Berhasil mengubah artikel");
    } catch (e) {
      next(e);
    }
  }

  async publishArticleById(req, res, next) {
    try {
      const { id } = req.params;

      const message = await articleService.publishArticleById(id);

      return response(res, 200, null, message);
    } catch (e) {
      next(e);
    }
  }

  async deleteArticleById(req, res, next) {
    try {
      const { id } = req.params;

      await articleService.deleteArticleById(id);

      return response(res, 200, null, "Berhasil menghapus data");
    } catch (e) {
      next(e);
    }
  }

  async getAllArticle(req, res, next) {
    try {
      const data = await articleService.getAllArticle();

      return response(res, 200, data, null);
    } catch (e) {
      next(e);
    }
  }
  async getAllPublishedArticle(req, res, next) {
    try {
      const data = await articleService.getAllPublishedArticle();

      return response(res, 200, data, null);
    } catch (e) {
      next(e);
    }
  }
  async getArticleById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await articleService.getArticleById(id);

      return response(res, 200, data, null);
    } catch (e) {
      next(e);
    }
  }
  async getPublishedArticleById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await articleService.getPublishedArticleById(id);

      return response(res, 200, data, null);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ArticleController;
