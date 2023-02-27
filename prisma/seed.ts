import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const users = [
  {
    firstName: 'Kyle',
    lastName: 'Lambert',
    email: 'kyle@gmail.com',
  },
  {
    firstName: 'Troy',
    lastName: 'Lambert',
    email: 'troy@gmail.com',
    organisationName: 'Grange Golf Club',
  },
  {
    firstName: 'George',
    lastName: 'Magnisalis',
    email: 'george@gmail.com',
    organisationName: 'Cafe Primo',
  },
  {
    firstName: 'Jay',
    lastName: 'Donjerkovic',
    email: 'jay@gmail.com',
    organisationName: 'EZY Electrical',
  },
];

async function seed() {
  await prisma.user.deleteMany();
  await prisma.organisation.deleteMany();

  const hashedPassword = await bcrypt.hash('test', 10);

  await Promise.all(
    users.map(async ({ firstName, lastName, email, organisationName }) => {
      if (organisationName) {
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
            organisations: {
              create: {
                organisation: {
                  create: {
                    name: organisationName,
                  },
                },
              },
            },
          },
        });
      } else {
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
      }
    })
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
