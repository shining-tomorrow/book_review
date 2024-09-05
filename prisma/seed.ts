import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const aspyn = await prisma.user.upsert({
    where: {email: 'aspyn_test@test.com'},
    update: {},
    create: {
      email: 'aspyn_test@test.com',
      nickName: 'aspyn',
      name: '김소정',
      password: '1234',
      balletStartDate: new Date('2022-11-01'),
      balletAcademy: '임진발레',
      balletSessionsPerWeek: 3,
    },
  });

  const record = await prisma.balletRecord.upsert({
    where: {
      date_userId: {date: new Date('2024-07-25'), userId: aspyn.id},
    },
    update: {},
    create: {
      date: new Date('2024-07-25'),
      balletDone: true,
      userId: aspyn.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
