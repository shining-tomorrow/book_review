import {deletePoll, fetchDetailPollItem, postPollOption} from '@/db/poll';
import {NextRequest, NextResponse} from 'next/server';
import {auth} from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest, {params: {id}}: {params: {id: string}}) {
  const session = (await auth()) as any;
  const userId = session?.user?.id;

  try {
    let response = await fetchDetailPollItem(id, userId);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}

export async function POST(request: Request) {
  const session = (await auth()) as any;
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({error: 'need LogIn'}, {status: 400});
  }

  try {
    const option = await request.json();

    let response = await postPollOption({...option, userId});
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}

/**
 * TODO. 투표 생성자인지 확인하고 삭제하기
 */
export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  try {
    let response = await deletePoll(params.id);
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}
