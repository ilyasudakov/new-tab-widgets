"use client";

import { FC, useEffect, useState } from "react";
import { Calendar } from "react-feather";
import { Widget } from "./widget";

interface DayFact {
  fact: string;
}

export const TodayFactsWidget: FC = () => {
  const [fact, setFact] = useState<DayFact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch("/api/facts/today");
        if (!response.ok) {
          throw new Error("Failed to fetch fact");
        }
        const data = await response.json();
        setFact(data);
      } catch (error) {
        console.error("Failed to fetch fact:", error);
        setFact(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFact();
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Widget
      title="Today"
      icon={Calendar}
      isLoading={isLoading}
      loadingText="Loading today's fact..."
    >
      <div className="space-y-4">
        <div className="px-3 border-l-8 font-mono text-xl border-gray-300">
          {formattedDate}
        </div>
        {!fact ? (
          <div className="font-mono text-sm text-gray-500">
            No fact available for today
          </div>
        ) : (
          <div className="flex items-center gap-3 py-1 px-3 border-l-8 border-gray-300">
            <div className="flex-1">
              <div className="font-mono">{fact.fact}</div>
            </div>
          </div>
        )}
      </div>
    </Widget>
  );
};
