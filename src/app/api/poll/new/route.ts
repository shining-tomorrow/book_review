import {createNewPoll} from '@/db/poll';
import {NextRequest, NextResponse} from 'next/server';
import {auth} from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const session = (await auth()) as any;
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({error: 'Need LogIn'}, {status: 400});
  }

  try {
    let data = await request.json();
    let response = await createNewPoll({...data, userId});

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}
