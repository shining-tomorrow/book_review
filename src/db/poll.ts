import {sql} from '@vercel/postgres';
import {prisma} from './client';

export interface PollListItem {
  id: string;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string;
  thumbnail_url: string;
  end_date: Date | null;
  author_id: number;
  author_nickname: string;
  has_voted: boolean;
  vote_count: number;
}

export async function fetchPollList(isCurrent: boolean, userId?: string): Promise<PollListItem[]> {
  /**
   * TODO.
   * UserId가 없는 경우 쿼리가 더 간단해질 수 있음
   */
  const {rows} = await sql.query(
    `
    select poll.id, poll.created_at, poll.updated_at, poll.title, poll.description, poll.thumbnail_url, poll.end_date, 
    poll.author_id, user_table.nickname as author_nickname, 
    count(DISTINCT user_vote.user_id) as vote_count,
    case 
      when Exists (
        select 1
        from "UserVote" as uv
        where uv.poll_id = poll.id and uv.user_id=$1
      )
      then true
      else false
    end as has_voted
    from "Poll" as poll
    join "User" as user_table on poll.author_id = user_table.id
    left join "UserVote" as user_vote on poll.id = user_vote.poll_id` +
      `${isCurrent ? ` where poll.end_date >= now() or poll.end_date is null` : ` where poll.end_date < now()`}` +
      ` group by poll.id, user_table.id
        order by poll.end_date desc`,
    [userId],
  );

  return rows as unknown as PollListItem[];
}

export interface DetailPollItem {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  end_date: Date | null;
  vote_count: number;
  author_id: string;
  author_nickname: string;
  created_at: string; // yyyy-MM-dd HH:mm:ss
  updated_at: string;
  allow_multiple: boolean; // 복수 선택 가능 여부
  options: OptionItem[];
  // todo
  comments?: {
    author: {id: string; nickname: string};
    content: string;
  }[];
}

export interface OptionItem {
  id: string;
  content: string;
  vote_count: number;
  has_voted: boolean;
}

export async function fetchDetailPollItem(id: string, userId?: string): Promise<DetailPollItem> {
  /**
   * where 절이 마지막에 위치해야 함
   */
  const {rows} = await sql.query(
    `
    select 
      poll.*, 
      user_table.nickname as author_nickname,
      count (DISTINCT user_vote.user_id) as vote_count 
    from "Poll" as poll 
    join "User" as user_table on poll.author_id = user_table.id
    left join "UserVote" as user_vote on poll.id = user_vote.poll_id
    where poll.id=$1
    group by poll.id, user_table.nickname
  `,
    [id],
  );

  const {rows: optionRows} = await sql.query(
    `
    with option_votes as (
      select
        poll_option.id, count(user_vote.option_id) as vote_count
      from "PollOption" as poll_option 
      left join "UserVote" as user_vote on poll_option.id = user_vote.option_id
      where poll_option.poll_id=$1
      group by poll_option.id
    ),
    user_vote as (
      select option_id from "UserVote" where user_id = $2 and poll_id = $1
    )
    select
      poll_option.id, poll_option.content, coalesce(option_votes.vote_count, 0) as vote_count,
      case
        when user_vote.option_id is not null then true
        else false
      end as has_voted
    from "PollOption" as poll_option
    left join option_votes on poll_option.id = option_votes.id
    left join user_vote on poll_option.id = user_vote.option_id
    where poll_option.poll_id=$1
  `,
    [id, userId],
  );

  rows[0].options = optionRows;

  return rows[0];
}

export interface PostPollOptionRequest {
  pollId: string;
  selectedOptionIds: string[];
  userId: string;
}

export async function postPollOption({
  pollId,
  selectedOptionIds,
  userId,
}: PostPollOptionRequest): Promise<{count: number}> {
  await prisma.userVote.deleteMany({
    where: {
      AND: {
        user_id: userId,
        poll_id: pollId,
      },
    },
  });

  const result = await prisma.userVote.createMany({
    data: selectedOptionIds.map(optionId => ({
      user_id: userId,
      poll_id: pollId,
      option_id: optionId,
    })),
  });

  return result;
}

export interface CreatePollRequestParam {
  title: string;
  description: string;
  thumbnail_url?: string;
  allow_multiple: boolean;
  end_date?: Date;
  options: string[];
  userId: string;
}

export interface CreatePollResponse {
  id: string; // "0d48deec-423d-47ba-94af-cffae1f9387f",
  created_at: Date; //"2024-11-18T14:09:24.128Z",
  updated_at: Date; //"2024-11-18T14:09:24.128Z",
  title: string; //"회식 날짜 정하기",
  author_id: string; //"b4479bc8-21fc-4bba-bb96-f46f30d52910",
  description: string; //"회식 회식",
  thumbnail_url: string | null; //null,
  end_date: Date | null; //"2024-11-19T00:00:00.000Z",
  allow_multiple: boolean; //false
}

export async function createNewPoll({
  title,
  description,
  thumbnail_url,
  allow_multiple,
  end_date,
  options,
  userId,
}: CreatePollRequestParam): Promise<CreatePollResponse> {
  const data = {
    author_id: userId,
    title,
    description,
    allow_multiple,
    options: {
      create: options.map(content => ({
        author_id: userId,
        content,
      })),
    },
  } as any;

  thumbnail_url && (data.thumbnail_url = thumbnail_url);
  end_date && (data.end_date = end_date);

  const poll = await prisma.poll.create({
    data,
  });

  return poll;
}

export async function deletePoll(pollId: string) {
  const deletePoll = await prisma.poll.delete({
    where: {
      id: pollId,
    },
  });

  return deletePoll;
}
