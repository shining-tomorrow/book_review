import {sql} from '@vercel/postgres';

export interface PollListItem {
  id: string;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string;
  thumbnail_url: string;
  end_date: Date | null;
  participant_count: number;
  author_id: number;
  author_nickname: string;
  has_voted: boolean;
}

export async function fetchPollList(isCurrent: boolean): Promise<PollListItem[]> {
  /**
   * TODO 현재 로그인한 userId로 바꾸기
   * "User" as user로 하면 에러 남
   */
  const {rows} = await sql.query(
    `
    select poll.id, poll.created_at, poll.updated_at, poll.title, poll.description, poll.thumbnail_url, poll.end_date, poll.participant_count, 
    poll.author_id, user_table.nickname as author_nickname, 
    case 
      when user_vote.user_id is not null then true
      else false
    end as has_voted
    from "Poll" as poll
    join "User" as user_table on poll.author_id = user_table.id
    left join "UserVote" as user_vote on poll.id = user_vote.poll_id AND user_vote.user_id=$1 ` +
      `${isCurrent ? ` where poll.end_date >= now() or poll.end_date is null` : ` where poll.end_date < now()`}`,
    [process.env.TEST_USER_ID],
  );

  return rows as unknown as PollListItem[];
}
