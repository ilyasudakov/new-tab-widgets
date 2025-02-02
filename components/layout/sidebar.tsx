"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Menu, X } from "react-feather";

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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-20 p-2 rounded-lg hover:bg-gray-100"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`fixed top-0 left-0 z-10 w-48 min-h-screen border-r border-gray-200 px-4 py-8 bg-white transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-2 mt-8">
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
    </div>
  );
};
