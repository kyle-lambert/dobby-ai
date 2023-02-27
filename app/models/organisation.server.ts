import { User } from '@prisma/client';
import { prisma } from '~/db.server';

export async function findOrganisationsByUserId(userId: User['id']) {
  console.log('findOrganisationsByUserId', userId);
  return await prisma.organisation.findMany({
    where: {
      users: {
        every: {
          user: {
            id: userId,
          },
        },
      },
    },
  });
}
