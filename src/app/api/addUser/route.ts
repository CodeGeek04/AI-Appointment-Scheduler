import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
    const user = await db.user.create({
      data: {
        mobile: body.mobile,
      },
    });
    return NextResponse.json({ message: user, status: 200 });
  } catch (e: any) {
    if (e.code == "P2002") {
      return NextResponse.json({
        message: "USER ALREADY EXISTS",
        status: 400,
      });
    }
    return NextResponse.json({ message: e, status: 500 });
  }
}
