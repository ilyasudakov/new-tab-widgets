"use client";

import { FC, useEffect, useState } from "react";
import { Cloud } from "react-feather";
import { Widget } from "./widget";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

export const WeatherWidget: FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}`
        );
        if (!response.ok) {
          throw new Error("Weather API response was not ok");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setError("Failed to fetch weather data");
      } finally {
        setIsLoading(false);
      }
    };

    const getLocationAndWeather = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            // Fallback to default location
            fetchWeather(44.34, 10.99);
          }
        );
      } else {
        // Fallback for browsers without geolocation
        fetchWeather(44.34, 10.99);
      }
    };

    getLocationAndWeather();
    // Refresh weather data every 5 minutes
    const interval = setInterval(getLocationAndWeather, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Widget
      title="Weather"
      icon={Cloud}
      isLoading={isLoading}
      loadingText="Loading weather..."
    >
      {!weather ? (
        <div className="font-mono text-sm text-gray-500">
          {error || "Weather data unavailable"}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 py-1 px-3 border-l-8 border-gray-300">
            <div className="flex-1">
              <div className="font-mono text-xl">
                {weather.temperature}°C - {weather.condition}
              </div>
              <div className="font-mono">{weather.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-1 px-3 border-l-8 border-gray-300">
            <div className="font-mono  text-sm">
              Humidity: {weather.humidity}% | Wind: {weather.windSpeed} m/s
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
};
