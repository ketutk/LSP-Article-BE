const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ArticleRepository {
  async addArticle(data) {
    const { title, text, image, user } = data;

    return await prisma.article.create({
      data: {
        article_id: `art_${new Date().getTime().toString().slice(7, 13)}`,
        title,
        text,
        image,
        admin_username: user.username,
      },
    });
  }
  async editArticle(data) {
    const { title, text, image, id } = data;

    return await prisma.article.update({
      where: {
        article_id: id,
      },
      data: {
        title,
        text,
        image,
      },
    });
  }

  async getArticleById(id) {
    return await prisma.article.findUnique({
      where: {
        article_id: id,
      },
      include: {
        admin: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  async getPublishedArticleById(id) {
    return await prisma.article.findUnique({
      where: {
        article_id: id,
        is_published: true,
      },
      include: {
        admin: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async publishArticleById(id, status) {
    return await prisma.article.update({
      where: {
        article_id: id,
      },
      data: {
        is_published: status,
      },
    });
  }

  async deleteArticleById(id) {
    return await prisma.article.delete({
      where: {
        article_id: id,
      },
    });
  }

  async getAllArticle() {
    return await prisma.article.findMany({
      select: {
        article_id: true,
        image: true,
        text: true,
        title: true,
        created_at: true,
        admin: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async getAllPublishedArticle() {
    return await prisma.article.findMany({
      where: {
        is_published: true,
      },
      select: {
        article_id: true,
        image: true,
        text: true,
        title: true,
        created_at: true,
        admin: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async;
}

module.exports = ArticleRepository;
