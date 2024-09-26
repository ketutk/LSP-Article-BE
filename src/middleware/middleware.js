const { Role } = require("@prisma/client");
const jsonwebtoken = require("jsonwebtoken");
const AuthRepository = require("../modules/auth/auth.repository");

const authRepository = new AuthRepository();

module.exports = {
  middleware: async (req, res, next) => {
    try {
      if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
          const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
          const user = await authRepository.getUserByUsername(decoded.username);

          if (!user) throw new Error("Failed");

          delete user.password;
          req.user_data = user;
          next();
        } catch {
          return res.status(401).json({
            status: 401,
            message: "Authentication failed, jwt invalid.",
            data: null,
          });
        }
      } else {
        return res.status(401).json({
          status: 401,
          message: "Authentication failed, please login.",
          data: null,
        });
      }
      /* c8 ignore start */
    } catch (error) {
      // console.log(error);
      next(error);
    }
  },
};
