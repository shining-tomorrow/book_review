import {NextRequest, NextResponse} from 'next/server';
import {fetchBalletRecord, updateBalletDone} from '../../../db/balletRecord';
import {auth} from '../auth/[...nextauth]/route';

export async function PUT(request: NextRequest) {
  const {date, ballet_done} = await request.json();
  const session = (await auth()) as any;
  const userId = session?.user?.id ?? null;

  if (!date || typeof ballet_done !== 'boolean' || !userId) {
    return NextResponse.json({error: 'Invalid request body'}, {status: 400});
  }

  const data = await updateBalletDone(date, ballet_done, userId);

  return NextResponse.json(data);
}

export interface BalletRecordItemForClient {
  id: string;
  date: string;
  ballet_done: boolean;
  user_id: string;
}
interface BalletRecordResponseForClient {
  balletRecords: BalletRecordItemForClient[];
  startDate: string;
  endDate: string;
}
export async function GET(
  request: NextRequest,
): Promise<NextResponse<BalletRecordResponseForClient | {error: string}>> {
  const date = request.nextUrl.searchParams.get('date');
  const session = (await auth()) as any;
  const userId = session?.user?.id ?? null;

  if (!date || !userId) {
    return NextResponse.json({error: 'Invalid request'}, {status: 400});
  }

  return NextResponse.json((await fetchBalletRecord(date, userId)) as unknown as BalletRecordResponseForClient);
}
