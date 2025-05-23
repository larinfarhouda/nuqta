"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navLinks = [
  { label: "الرئيسية", href: "/adminlarin73" },
  { label: "الفعاليات", href: "/adminlarin73/events" },
  { label: "مقدمي الخدمات", href: "/adminlarin73/providers" },
  { label: "الإعدادات", href: "/adminlarin73/settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 text-right">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l shadow-sm p-4 space-y-6">
        <h2 className="text-xl font-bold text-[#2CA6A4]">لوحة التحكم</h2>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium text-right transition-all ${
                pathname === link.href
                  ? "bg-[#2CA6A4] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
    </div>
  );
}
