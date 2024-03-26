import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// Assuming clinicUserId is sent in the request body for demonstration purposes
const AppointmentRequestBody = z.object({
    clinicUserId: z.number(),
});

function generateUniqueFutureDates(numDates: number) {
    const dates = new Set<string>();
    while (dates.size < numDates) {
        const currentDate = new Date();
        const daysToAdd = Math.floor(Math.random() * 30) + 1; // Random number of days from 1 to 30
        currentDate.setDate(currentDate.getDate() + daysToAdd);
        const dateStr = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        dates.add(dateStr);
    }
    return Array.from(dates);
}

function generateTimeSlots() {
    const times = [];
    while (times.length < 4) {
        const hour = Math.floor(Math.random() * (17 - 9)) + 9; // 9 to 17 (5 PM exclusive)
        const time = `${hour.toString().padStart(2, '0')}:00`; // HH:00 format
        if (!times.includes(time)) {
            times.push(time);
        }
    }
    return times;
}

function generateAppointmentSlots() {
    const dates = generateUniqueFutureDates(4); // Generate 4 unique future dates
    const appointments = dates.map(date => ({
        date,
        times: generateTimeSlots(), // Generate 4 time slots for each date
    }));
    return appointments;
}

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const parsedBody = AppointmentRequestBody.safeParse(reqBody);

    if (!parsedBody.success) {
        return NextResponse.json({ message: "Invalid request body", status: 400 });
    }

    const { clinicUserId } = parsedBody.data;
    const appointments = generateAppointmentSlots();

    return NextResponse.json({ clinicUserId, appointments, status: 200 });
}
