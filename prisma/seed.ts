import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const users = [
  {
    firstName: 'Kyle',
    lastName: 'Lambert',
    email: 'kyle@gmail.com',
    organisation: {
      name: 'Organisation 1',
    },
  },
  {
    firstName: 'Troy',
    lastName: 'Lambert',
    email: 'troy@gmail.com',
    organisation: {
      name: 'Organisation 2',
    },
  },
  {
    firstName: 'George',
    lastName: 'Magnisalis',
    email: 'george@gmail.com',
    organisation: {
      name: 'Organisation 3',
    },
  },
  {
    firstName: 'Jay',
    lastName: 'Donjerkovic',
    email: 'jay@gmail.com',
    organisation: {
      name: 'Organisation 4',
    },
  },
];

async function seed() {
  await prisma.user.deleteMany();
  await prisma.organisation.deleteMany();

  const hashedPassword = await bcrypt.hash('test', 10);

  await Promise.all(
    users.map(async ({ firstName, lastName, email, organisation }) => {
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
                  name: organisation.name,
                },
              },
            },
          },
        },
      });
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
