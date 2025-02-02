"use client";

import { FC, useEffect, useState } from "react";
import { Calendar } from "react-feather";

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  isAllDay?: boolean;
}

export const CalendarEventsWidget: FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/calendar/events");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="font-mono text-sm text-gray-500">Loading events...</div>
    );
  }

  return (
    <div className="space-y-4  border-2 border-gray-300 rounded-lg">
      <div className="space-y-4 p-4">
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="font-mono text-sm text-gray-500">
              No upcoming events
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 py-1 px-3 border-l-4 border-gray-300"
              >
                <div className="flex-1">
                  <div className="font-mono">{event.title}</div>
                  <div className="font-mono text-xs text-gray-500">
                    {event.isAllDay
                      ? "All day"
                      : `${new Date(event.startTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}${
                          event.endTime
                            ? ` - ${new Date(event.endTime).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}`
                            : ""
                        }`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="p-4 bg-gray-300 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-black" />
        <div className="font-mono text-left">Calendar</div>
      </div>
    </div>
  );
};
