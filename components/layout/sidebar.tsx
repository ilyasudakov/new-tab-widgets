"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Integrations",
    href: "/integrations",
  },
];

export const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-48 min-h-screen border-r border-gray-200 px-4 py-8">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block font-mono py-2 px-3 rounded-lg ${
              pathname === item.href
                ? "bg-gray-100"
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
