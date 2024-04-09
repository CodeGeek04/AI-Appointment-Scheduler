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
    const appointments = await db.appointments.findMany({
      where: {
        mobile: body.mobile,
      },
    });
    if (appointments.length > 0) {
      return NextResponse.json({ appointments, status: 200 });
    } else {
      return NextResponse.json({
        message: "NO APPOINTMENT FOUND",
        status: 404,
      });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e, status: 500 });
  }
}
