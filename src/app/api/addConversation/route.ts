/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";


const RegisterRequestBody = z.object({
    mobile: z.string().min(5).max(15),
    user: z.string().default(""),
    bot: z.string().default(""),

});
export async function POST(request: NextRequest) {
    const req = await request.json();
    const body = RegisterRequestBody.parse(req);
    try {

        const user = await db.conversation.create({
            data: {
                mobile: body.mobile,
                user: body.user,
                bot: body.bot,
            },
        });
        return NextResponse.json({ message: user, status: 200 });
    }

    catch (e: any) {
        if (e.code == "P2002") {
            return NextResponse.json({
                message: "ERROR ADDING CONVERSATION",
                status: 400,
            });
        }
        return NextResponse.json({ message: e, status: 500 });
    }
}
