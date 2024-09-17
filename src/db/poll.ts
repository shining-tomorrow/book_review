import {prisma} from './client';

export async function fetchPollList() {
  const pollList = await prisma.poll.findMany();

  return pollList;
}
