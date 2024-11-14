import {prisma} from './client';

export async function fetchUserProfile() {
  const user = await prisma.user.findUnique({
    where: {
      email: 'aspyn_test@test.com',
    },
  });

  return user;
}

export async function isEmailExist(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return !!user;
}

export async function isNicknameExist(nickname: string) {
  const user = await prisma.user.findUnique({
    where: {
      nickname,
    },
  });

  return !!user;
}

export async function createUser(userFormData: {email: string; password: string; nickname: string}) {
  return prisma.user.create({data: userFormData});
}
