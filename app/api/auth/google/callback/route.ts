import { oauth2Client } from "@/lib/google-auth";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${BASE_URL}/integrations?error=no_code`);
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    const response = NextResponse.redirect(
      `${BASE_URL}/integrations?success=true`
    );
    response.cookies.set("google_tokens", JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Error getting tokens:", error);
    return NextResponse.redirect(`${BASE_URL}/integrations?error=token_error`);
  }
}
