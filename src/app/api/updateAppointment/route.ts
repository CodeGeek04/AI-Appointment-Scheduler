/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";


function convertToISO8601(dateString: string): string {
  // Split the date string into year, month, and day
  const [year, month, day] = dateString.split('-');

  // Add a check to ensure that the year, month, and day variables are not undefined
  if (year === undefined || month === undefined || day === undefined) {
      throw new Error('Invalid date format');
  }

  // Create a new Date object with the given year, month, and day
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)+1);

  // Return the date in ISO-8601 format
  return date.toISOString();
}


const RegisterRequestBody = z.object({
    id: z.string(),
    
    clinic: z.string().default(""),
    date: z.string().default(""),
    time: z.string().default(""),
    
});

export async function POST(request: NextRequest) {
  const req = await request.json();
  const body = RegisterRequestBody.parse(req);
  
   try { 
    const user = await db.appointments.update({
      where: { id: body.id},
      data: {       
        clinic: body.clinic,
        date: convertToISO8601(body.date),
        time: body.time,
      },
    });

    return NextResponse.json({ message: user, status: 200 });

  } catch (e: any) {
    if (e.code == "P2002") {
      return NextResponse.json({
        message: "ERROR UPDATING APPOINTMENT",
        status: 400,
      });
    }
    return NextResponse.json({ message: e, status: 500 });
  }
}
