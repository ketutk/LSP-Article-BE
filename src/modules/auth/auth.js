const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imageUpload = require("../../helper/image.upload");
const { throwError } = require("../../helper/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthRepository = require("./auth.repository");

const authRepository = new AuthRepository();

class AuthService {
  async login(data) {
    try {
      const { username, password } = data;
      const user = await authRepository.getUserByUsername(username);
      if (!user) throwError(404, "User not found");

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throwError(400, "Invalid password");

      delete user.password;

      const token = jwt.sign(user, process.env.JWT_SECRET);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
