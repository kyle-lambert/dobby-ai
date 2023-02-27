import { Organisation, User } from '@prisma/client';
import { prisma } from '~/db.server';

export async function findUserOrganisationByIds(
  userId: User['id'],
  organisationId: Organisation['id']
) {
  return await prisma.userOrganisation.findUnique({
    where: {
      userId_organisationId: {
        userId,
        organisationId,
      },
    },
    include: {
      user: true,
      organisation: true,
    },
  });
}
