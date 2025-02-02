import { FC } from "react";
import { CalendarEventsWidget } from "@/components/widgets/calendar-events";
import { RootLayout } from "@/components/layout/root-layout";
import { WeatherWidget } from "@/components/widgets/weather";
import { TodayFactsWidget } from "@/components/widgets/today-facts";

const DashboardPage: FC = () => {
  return (
    <RootLayout>
      <div className="max-w-[1200px] mx-auto py-8 px-4 h-full max-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,400px] gap-4 h-full">
          <div className="h-full">
            <CalendarEventsWidget />
          </div>
          <div className="space-y-4 h-full flex flex-col items-stretch justify-stretch">
            <TodayFactsWidget />
            <WeatherWidget />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default DashboardPage;
