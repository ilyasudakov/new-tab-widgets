"use client";

import { FC, useEffect, useState } from "react";
import { Cloud } from "react-feather";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const WeatherWidget: FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // TODO: Implement weather API endpoint
        // const response = await fetch("/api/weather");
        // const data = await response.json();
        // setWeather(data);

        // Temporary mock data
        setWeather({
          temperature: 22,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (isLoading) {
    return (
      <div className="font-mono text-sm text-gray-500">Loading weather...</div>
    );
  }

  return (
    <div className="space-y-4 border-2 border-gray-300 rounded-lg">
      <div className="space-y-4 p-4">
        {!weather ? (
          <div className="font-mono text-sm text-gray-500">
            Weather data unavailable
          </div>
        ) : (
          <div className="flex items-center gap-3 py-1 px-3 border-l-4 border-gray-300">
            <div className="flex-1">
              <div className="font-mono">
                {weather.temperature}°C - {weather.condition}
              </div>
              <div className="font-mono text-xs text-gray-500">
                Humidity: {weather.humidity}% | Wind: {weather.windSpeed} km/h
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-300 flex items-center gap-2">
        <Cloud className="w-4 h-4 text-black" />
        <div className="font-mono text-left">Weather</div>
      </div>
    </div>
  );
};
