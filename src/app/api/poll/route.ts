import {createNewPoll, fetchPollList} from '@/db/poll';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  const isCurrent = request.nextUrl.searchParams.get('isCurrent') === 'true';
  try {
    let response = await fetchPollList(isCurrent);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}

export async function POST(request: Request) {
  try {
    let response = await createNewPoll(await request.json());
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}
