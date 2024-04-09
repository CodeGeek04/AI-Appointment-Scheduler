/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const RegisterRequestBody = z.object({
  mobile: z.string().min(5).max(15),
});
export async function POST(request: NextRequest) {
  const req = await request.json();
  const body = RegisterRequestBody.parse(req);
  try {
    const user = await db.user.findFirst({
      where: {
        mobile: body.mobile,
      },
    });
    if (user) {
      return NextResponse.json({ message: user, status: 200 });
    } else {
      return NextResponse.json({ message: "USER NOT FOUND", status: 200 });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e, status: 500 });
  }
}
