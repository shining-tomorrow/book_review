import {fetchPollList} from '@/db/poll';
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
