import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // delete users
  await prisma.user.deleteMany({});

  const user1: Prisma.UserCreateInput = {
    email: "aspyn_test@test.com",
    nickName: "aspyn",
    name: "김소정",
    password: "1234",
    balletStartDate: new Date("2022-11-01"),
    balletAcademy: "임진발레",
    balletSessionsPerWeek: 3,
  };

  const result = await prisma.user.create({ data: user1 });
  console.log("result", result);
}

main();
