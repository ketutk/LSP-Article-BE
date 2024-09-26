const { uploadImage, deleteImage } = require("../../helper/image.upload");
const { throwError } = require("../../helper/response");
const ArticleRepository = require("./article.repository");

const articleRepository = new ArticleRepository();

class ArticleService {
  async addArticle(data) {
    try {
      if (!data.image) throwError(400, "Image perlu dikirim");
      data.image = await uploadImage(data.image, "article");

      return await articleRepository.addArticle(data);
    } catch (e) {
      throw e;
    }
  }

  async editArticleById(data) {
    try {
      const article = await articleRepository.getArticleById(data.id);

      if (!article) throwError(404, "Data tidak ditemukan");

      if (data.image) {
        await deleteImage(article.image);
        data.image = await uploadImage(data.image, "article");
      } else {
        data.image = article.image;
      }

      return await articleRepository.editArticle(data);
    } catch (e) {
      throw e;
    }
  }

  async publishArticleById(id) {
    try {
      const article = await articleRepository.getArticleById(id);

      if (!article) throwError(404, "Data tidak ditemukan");

      const status = article.is_published === false ? true : false;

      await articleRepository.publishArticleById(id, status);

      return `Status artikel diubah menjadi ${status === true ? "publish" : "draft"}`;
    } catch (e) {
      throw e;
    }
  }

  async deleteArticleById(id) {
    try {
      const article = await articleRepository.getArticleById(id);

      if (!article) throwError(404, "Data tidak ditemukan");

      await deleteImage(article.image);

      return await articleRepository.deleteArticleById(id);
    } catch (e) {
      throw e;
    }
  }

  async getAllArticle() {
    try {
      return await articleRepository.getAllArticle();
    } catch (e) {
      throw e;
    }
  }

  async getAllPublishedArticle() {
    try {
      return await articleRepository.getAllPublishedArticle();
    } catch (e) {
      throw e;
    }
  }

  async getArticleById(id) {
    try {
      const article = await articleRepository.getArticleById(id);
      if (!article) throwError(404, "Data tidak ditemukan");

      return article;
    } catch (e) {
      throw e;
    }
  }
  async getPublishedArticleById(id) {
    try {
      const article = await articleRepository.getPublishedArticleById(id);
      if (!article) throwError(404, "Data tidak ditemukan");

      return article;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ArticleService;
