import { FC, PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};
