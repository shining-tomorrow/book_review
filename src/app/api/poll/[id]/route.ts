import {fetchDetailPollItem} from '@/db/poll';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest, {params: {id}}: {params: {id: string}}) {
  try {
    let response = await fetchDetailPollItem(id);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}
