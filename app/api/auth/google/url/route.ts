import { oauth2Client } from "@/lib/google-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    prompt: "consent",
  });

  return NextResponse.json({ url: authUrl });
}
