import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const DEFAULT_LAT = "44.34";
const DEFAULT_LON = "10.99";

export async function GET(request: Request) {
  if (!OPENWEATHER_API_KEY) {
    console.error("OpenWeather API key is not configured");
    return NextResponse.json(
      { error: "Weather API is not configured" },
      { status: 500 }
    );
  }

  try {
    // Get location from query parameters
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") || DEFAULT_LAT;
    const lon = searchParams.get("lon") || DEFAULT_LON;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Weather API error response:", errorText);
      throw new Error(`Weather API failed with status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      location: data.name,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
