import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { getCoordinates } from "~/utils/coordinates";

const RegisterRequestBody = z.object({
  mobile: z.string().min(5).max(15),
  name: z.string(),
  address: z.string(),
});
export async function POST(request: NextRequest) {
  const req = await request.json();
  const body = RegisterRequestBody.parse(req);
  try {
    const response = await getCoordinates(body.address);
    if (!response) {
      return NextResponse.json({
        message: "ERROR FETCHING COORDINATES",
        status: 400,
      });
    }
    const { latitude, longitude } = response;
    const user = await db.user.update({
      where: { mobile: body.mobile },
      data: {
        name: body.name,
        address: body.address,
        latitude,
        longitude,
      },
    });
    return NextResponse.json({ message: user, status: 200 });
  } catch (e: any) {
    if (e.code == "P2002") {
      return NextResponse.json({
        message: "ERROR UPDATING USER",
        status: 400,
      });
    }
    return NextResponse.json({ message: e, status: 500 });
  }
}
