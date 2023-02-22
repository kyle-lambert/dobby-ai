import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    firstName: "Kyle",
    lastName: "Lambert",
    email: "kyle@gmail.com",
  },
  {
    firstName: "Troy",
    lastName: "Lambert",
    email: "troy@gmail.com",
  },
  {
    firstName: "George",
    lastName: "Magnisalis",
    email: "george@gmail.com",
  },
  {
    firstName: "Jay",
    lastName: "Donjerkovic",
    email: "jay@gmail.com",
  },
];

async function seed() {
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("test", 10);

  await Promise.all(
    users.map(async ({ firstName, lastName, email }) => {
      return await prisma.user.create({
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
    })
  );

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
