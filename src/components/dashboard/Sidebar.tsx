"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CubeLogo from "@/components/landing/CubeLogo";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/dashboard/tickets", label: "Tickets", icon: "🎫" },
  { href: "/dashboard/workflow", label: "Workflow", icon: "⚙" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚡" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-5">
        <CubeLogo className="h-7 w-7 text-primary-light" />
        <span className="text-sm font-bold tracking-wider text-white">
          AI SUPPORT
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-active/20 text-sidebar-active"
                  : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-sidebar-text">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
