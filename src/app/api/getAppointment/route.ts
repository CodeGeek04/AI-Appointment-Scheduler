import { NextResponse, type NextRequest } from "next/server";

function generateRandomFutureDateAndTime() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime());

    // Generate a random number of days from 1 to 30
    const daysToAdd = Math.floor(Math.random() * 30) + 1;
    futureDate.setDate(currentDate.getDate() + daysToAdd);

    // Generate a random hour for the appointment between 9 AM and 5 PM
    const hour = Math.floor(Math.random() * (17 - 9 + 1)) + 9;
    futureDate.setHours(hour, 0, 0, 0); // Set minutes, seconds, and milliseconds to 0

    // Format date and time
    const date = futureDate.toISOString().split('T')[0];
    const time = futureDate.toTimeString()?.split(' ')[0]?.substring(0, 5) ?? '';

    return { date, time };
}

export async function GET(_request: NextRequest) {
    const { date, time } = generateRandomFutureDateAndTime();
    return NextResponse.json({ date, time, status: 200 });
}
