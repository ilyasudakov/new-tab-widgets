import { FC, ReactNode } from "react";

interface WidgetProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export const Widget: FC<WidgetProps> = ({
  title,
  icon: IconComponent,
  children,
  isLoading,
  loadingText = "Loading...",
}) => {
  if (isLoading) {
    return <div className="font-mono text-sm text-gray-500">{loadingText}</div>;
  }

  return (
    <div className="border-2 border-gray-300 rounded-lg h-full flex flex-col items-stretch justify-stretch">
      <div className="space-y-4 p-4 flex-1 flex items-center">{children}</div>
      <div className="p-4 bg-gray-300 flex items-center gap-2">
        <IconComponent className="w-4 h-4 text-black" />
        <div className="font-mono text-left">{title}</div>
      </div>
    </div>
  );
};
