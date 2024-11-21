import {fetchPollList} from '@/db/poll';
import {NextRequest, NextResponse} from 'next/server';
import {auth} from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  const isCurrent = request.nextUrl.searchParams.get('isCurrent') === 'true';
  const session = (await auth()) as any;

  try {
    let response = await fetchPollList(isCurrent, session?.user?.id);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}
