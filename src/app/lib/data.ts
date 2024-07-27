import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchUserProfile() {
  const user = await prisma.user.findUnique({
    where: {
      email: "aspyn_test@test.com",
    },
  });
  console.log("user", user);
  return user;
}
