import { User } from '@prisma/client';
import { prisma } from '~/db.server';

export async function findOrganisationsByUserId(userId: User['id']) {
  return await prisma.organisation.findMany({
    where: {
      users: {
        some: {
          user: {
            id: userId,
          },
        },
      },
    },
  });
}
