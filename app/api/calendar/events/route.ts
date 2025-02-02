import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { oauth2Client } from "@/lib/google-auth";

// Cache response for 2 minutes
export const revalidate = 120;

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
}

export async function GET() {
  const cookieStore = await cookies();
  const tokensCookie = cookieStore.get("google_tokens");

  if (!tokensCookie) {
    return NextResponse.json({ events: [] }, { status: 401 });
  }

  try {
    const tokens = JSON.parse(tokensCookie.value);
    oauth2Client.setCredentials(tokens);

    const now = new Date();
    const twelveHoursFromNow = new Date(now.getTime() + 12 * 60 * 60 * 1000);

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now.toISOString()}&timeMax=${twelveHoursFromNow.toISOString()}&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
        // Add Next.js fetch cache options
        next: {
          revalidate: 120, // Cache for 2 minutes
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    const events =
      data.items?.map((event: CalendarEvent) => ({
        id: event.id,
        title: event.summary,
        startTime: event.start?.dateTime || event.start?.date,
        endTime: event.end?.dateTime || event.end?.date,
        isAllDay: !event.start?.dateTime,
      })) || [];

    return NextResponse.json(
      { events },
      {
        headers: {
          "Cache-Control":
            "max-age=120, s-maxage=120, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return NextResponse.json({ events: [] }, { status: 500 });
  }
}
