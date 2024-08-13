import {prisma} from './client';

export async function fetchUserProfile() {
  const user = await prisma.user.findUnique({
    where: {
      email: 'aspyn_test@test.com',
    },
  });

  return user;
}
