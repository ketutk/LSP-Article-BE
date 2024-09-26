const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
exports.UsersSeeder = async () => {
  return new Promise(async (resolve, reject) => {
    const datas = [
      {
        name: "Krisna Ganteng",
        username: "krisna",
        password: await bcrypt.hash("krisna123", 10),
      },
    ];

    try {
      await prisma.admin.deleteMany({});

      await prisma.admin.createMany({
        data: datas,
      });
      resolve("Success create admin seeds");
    } catch (error) {
      reject(error.message);
    }
  });
};
