import { FC } from "react";
import { CalendarEventsWidget } from "@/components/widgets/calendar-events";
import { RootLayout } from "@/components/layout/root-layout";
import { WeatherWidget } from "@/components/widgets/weather";

const DashboardPage: FC = () => {
  return (
    <RootLayout>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="space-y-8">
          <CalendarEventsWidget />
          <WeatherWidget />
        </div>
      </div>
    </RootLayout>
  );
};

export default DashboardPage;
