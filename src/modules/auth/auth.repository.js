const { PrismaClient } = require("@prisma/client");
const { throwError } = require("../../helper/response");
const prisma = new PrismaClient();

class AuthRepository {
  async getUserByUsername(username) {
    return await prisma.admin.findUnique({
      where: {
        username,
      },
    });
  }
}

module.exports = AuthRepository;
