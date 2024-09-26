const { PrismaClient } = require("@prisma/client");
const { UsersSeeder } = require("./users.seed");
const prisma = new PrismaClient();
async function main() {
  const createUsers = await UsersSeeder();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
