import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const firstName = "Kyle";
  const lastName = "Lambert";
  const email = "klambert@outlook.com";

  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
