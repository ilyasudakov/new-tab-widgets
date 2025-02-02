"use client";

import { FC, useState, useEffect } from "react";
import { RootLayout } from "@/components/layout/root-layout";

interface Integration {
  id: string;
  name: string;
  status: "available" | "coming_soon";
  features: string[];
  icon: string;
  isConnected?: boolean;
}

const integrations: Integration[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    status: "available",
    features: [
      "Display upcoming events for today",
      "Week overview",
      "Quick add event functionality",
      "Color coding for different calendars",
    ],
    icon: "/icons/google-calendar.svg",
  },
  {
    id: "gmail",
    name: "Gmail",
    status: "coming_soon",
    features: [
      "Unread email count",
      "Preview of latest important emails",
      "Quick compose functionality",
    ],
    icon: "/icons/gmail.svg",
  },
  {
    id: "weather",
    name: "Weather",
    status: "coming_soon",
    features: [
      "Current weather conditions",
      "Daily forecast",
      "Weather alerts",
    ],
    icon: "/icons/weather.svg",
  },
  {
    id: "tasks",
    name: "Tasks",
    status: "coming_soon",
    features: [
      "Integration with Google Tasks",
      "Quick add task",
      "Due date tracking",
    ],
    icon: "/icons/tasks.svg",
  },
];

const IntegrationsPage: FC = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [connectedServices, setConnectedServices] = useState<string[]>([]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/google/status");
        const { isConnected, service } = await response.json();
        if (isConnected) {
          setConnectedServices((prev) => [...prev, service]);
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleConnect = async (integrationId: string) => {
    try {
      setIsLoading(integrationId);
      if (integrationId === "google-calendar") {
        const response = await fetch("/api/auth/google/url");
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error("Failed to connect:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <RootLayout>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="font-mono text-xl mb-6 bg-gray-100 p-4 rounded-lg">
          Integrations
        </h1>

        <div className="space-y-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center gap-3 py-2 px-3 border-l-4 border-gray-300"
            >
              <span className="font-mono">{integration.name}</span>
              {integration.status === "coming_soon" && (
                <span className="font-mono text-xs text-gray-500">
                  Coming Soon
                </span>
              )}
              {integration.status === "available" && (
                <>
                  {connectedServices.includes(integration.id) ? (
                    <div className="ml-auto flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="font-mono text-xs text-gray-500">
                        Connected
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(integration.id)}
                      disabled={isLoading === integration.id}
                      className="font-mono text-blue-600 hover:text-blue-800 underline ml-auto disabled:opacity-50"
                    >
                      {isLoading === integration.id
                        ? "Connecting..."
                        : "Connect"}
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default IntegrationsPage;
