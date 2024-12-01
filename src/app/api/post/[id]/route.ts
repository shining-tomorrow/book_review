import {findPostById} from '@/db/post';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest, {params: {id}}: {params: {id: string}}) {
  try {
    let response = await findPostById(id);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({error: 'SQL Error'}, {status: 500});
  }
}
