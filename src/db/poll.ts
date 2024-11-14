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

export async function fetchPollList(isCurrent: boolean): Promise<PollListItem[]> {
  /**
   * TODO 현재 로그인한 userId로 바꾸기
   * "User" as user로 하면 에러 남
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
    [process.env.TEST_USER_ID],
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

export async function fetchDetailPollItem(id: string): Promise<DetailPollItem> {
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
    [id, process.env.TEST_USER_ID],
  );

  rows[0].options = optionRows;

  return rows[0];
}

export interface PostPollOptionRequest {
  pollId: string;
  selectedOptionIds: string[];
}

export async function postPollOption({pollId, selectedOptionIds}: PostPollOptionRequest): Promise<{count: number}> {
  await prisma.userVote.deleteMany({
    where: {
      AND: {
        user_id: process.env.TEST_USER_ID,
        poll_id: pollId,
      },
    },
  });

  const result = await prisma.userVote.createMany({
    data: selectedOptionIds.map(optionId => ({
      user_id: process.env.TEST_USER_ID ?? '',
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
  end_date?: string; // TODO. date를 어떤 형식으로 넘겨야 하는지
  options: string[];
}

export async function createNewPoll({
  title,
  description,
  thumbnail_url,
  allow_multiple,
  end_date,
  options,
}: CreatePollRequestParam) {
  const data = {
    author_id: process.env.TEST_USER_ID,
    title,
    description,
    allow_multiple,
    options: {
      create: options.map(content => ({
        author_id: process.env.TEST_USER_ID,
        content,
      })),
    },
  } as any;

  thumbnail_url && (data.thumbnail_url = thumbnail_url);

  const poll = await prisma.poll.create({
    data,
  });

  return poll;
}
