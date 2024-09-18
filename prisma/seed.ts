import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Omit<Prisma.UserCreateInput, "password">[] = [
  {
    username: "admin",
    displayName: "ADMIN",
  },
];

const saltRounds = 10; // 鹽的回合數（哈希強度）

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    // 對密碼進行哈希處理
    const hashedPassword = await bcrypt.hash("admin", saltRounds);

    const user = await prisma.user.create({
      data: {
        ...u,
        password: hashedPassword, // 使用哈希後的密碼
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
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
