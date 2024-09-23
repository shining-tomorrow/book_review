import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  let user = await prisma.user.findUnique({where: {id: process.env.TEST_USER_ID}});

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: process.env.TEST_USER_ID,
        email: 'aspyn_test@test.com',
        nickname: 'aspyn',
        name: '김소정',
        password: '1234',
        ballet_start_date: new Date('2022-11-01'),
        ballet_academy: '임진발레',
        ballet_sessions_per_week: 3,
        profile_image_url:
          'https://zjnkgnavmphkyf5n.public.blob.vercel-storage.com/Screenshot%202024-09-24%20at%202.42.09%E2%80%AFAM-xyG8NY1itegh3C1Z3yH7u9eyCSBdIZ.png',
      },
    });
  }

  let balletRecord = await prisma.balletRecord.findUnique({where: {id: process.env.TEST_BALLET_RECORD_ID}});

  if (!balletRecord) {
    balletRecord = await prisma.balletRecord.create({
      data: {
        id: process.env.TEST_BALLET_RECORD_ID,
        date: new Date('2024-07-25'),
        ballet_done: true,
        user_id: user.id,
      },
    });
  }

  let poll = await prisma.poll.findUnique({where: {id: process.env.TEST_POLL_ID}});

  if (!poll) {
    // PollUncheckedCreateInput 타입
    poll = await prisma.poll.create({
      data: {
        author_id: user.id,
        id: process.env.TEST_POLL_ID,
        title: '최애 발레 슈즈 투표',
        description:
          '취미 발레 하시는 분들은 어떤 슈즈 많이 신으세요?<br>가격대도 다양하고, 처음이라 어떤 슈즈를 사야할지 모르겠어요😢',
        allow_multiple: true,
        thumbnail_url:
          'https://zjnkgnavmphkyf5n.public.blob.vercel-storage.com/nihal-demirci-erenay-UYG1U5wj3Tk-unsplash-RKVLJAGugUPwH0o5x4eWvNUCq2Q9PX.jpg',
        options: {
          create: [
            {author_id: user.id, content: '그리쉬코 바닥분리형 천슈즈 Model NO.10'},
            {author_id: user.id, content: '웨어무아 가죽슈즈 WM406'},
            {author_id: user.id, content: 'Degas 파리 오페라스쿨 발레슈즈'},
            {author_id: user.id, content: '웨어무아 베스타 vesta'},
            {author_id: user.id, content: '알롱제 Luzio 천슈즈'},
            {author_id: user.id, content: 'Capezio 2028W Juliet Canvas Shoes'},
          ],
        },
      },
    });
  }
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
