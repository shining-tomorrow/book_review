import { NextRequest, NextResponse } from "next/server";
import { updateBalletDone } from "../../lib/data";

export async function PUT(request: NextRequest) {
  const { date, balletDone } = await request.json();

  if (!date || typeof balletDone !== "boolean") {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const data = await updateBalletDone(date, balletDone);

  return NextResponse.json(data);
}
