import type { User } from '@prisma/client';

import { prisma } from '~/db.server';

export type { User } from '@prisma/client';

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } });
}

// export async function createUser(
//   firstName: User['firstName'],
//   lastName: User['lastName'],
//   email: User['email'],
//   password: string
// ) {
//   const hashedPassword = await bcrypt.hash(password, 10);

//   return prisma.user.create({
//     data: {
//       firstName,
//       lastName,
//       email,
//       password: {
//         create: {
//           hash: hashedPassword,
//         },
//       },
//     },
//   });
// }

export async function deleteUserByEmail(email: User['email']) {
  return prisma.user.delete({ where: { email } });
}
