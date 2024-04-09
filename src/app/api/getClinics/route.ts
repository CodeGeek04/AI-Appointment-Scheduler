/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { calculateDistance } from "~/utils/distance";

const RegisterRequestBody = z.object({
  latitude: z.number().default(-1),
  longitude: z.number().default(-1),
  nearest: z.number().default(1),
});
export async function POST(request: NextRequest) {
  const req = await request.json();
  const body = RegisterRequestBody.parse(req);
  try {
    const clinics = await db.clinic.findMany();
    if (!clinics) {
      return NextResponse.json({ message: "NO CLINICS FOUND", status: 404 });
    }
    if (body.latitude === -1 || body.longitude === -1) {
      return NextResponse.json({ message: clinics, status: 200 });
    }
    clinics.sort((clinicA, clinicB) => {
      const distanceA = calculateDistance(
        clinicA.latitude,
        clinicA.longitude,
        body.latitude,
        body.longitude,
      );
      const distanceB = calculateDistance(
        clinicB.latitude,
        clinicB.longitude,
        body.latitude,
        body.longitude,
      );
      return distanceA - distanceB;
    });
    const nearestClinics = clinics.slice(0, body.nearest);
    return NextResponse.json({ message: nearestClinics, status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e, status: 500 });
  }
}
