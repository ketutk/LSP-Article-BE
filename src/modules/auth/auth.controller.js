const { throwError, response } = require("../../helper/response");
const AuthService = require("./auth");
const { LoginSchema } = require("./auth.validation");

const authService = new AuthService();

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const result = LoginSchema.safeParse({ username, password });

      if (!result.success) throwError(400, result.error.issues);

      const data = await authService.login({ username, password });
      return response(res, 200, data, "Anda Berhasil Login!");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
