"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, bottomNav } from "@/config/nav";
import { BrandLogo } from "./BrandLogo";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function AppShell({ children, userSlot }: { children: React.ReactNode; userSlot?: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Điều hướng chính">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive(path, href) ? "bg-[#ddfbff] text-[#00626a] font-semibold" : "text-[#505f76] hover:bg-[#f1f5f9] hover:text-[#191c1e]"
          }`}
        >
          <Icon className="w-4.5 h-4.5" />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-white border-r border-[#e2e8f0] h-screen sticky top-0">
        <div className="px-4 py-4 border-b border-[#f1f5f9]"><BrandLogo size={44} /></div>
        {nav}
        {userSlot && <div className="border-t border-[#f1f5f9] p-3">{userSlot}</div>}
      </aside>

      {/* Header mobile */}
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-[#e2e8f0] px-4 py-2.5 flex items-center justify-between gap-2">
        <BrandLogo size={36} />
        <button type="button" onClick={() => setOpen(true)} className="p-2 rounded-lg text-[#505f76] hover:bg-[#f1f5f9]" aria-label="Mở menu">
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Drawer mobile */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="relative w-72 max-w-[85%] bg-white h-full flex flex-col">
            <div className="px-4 py-3 border-b border-[#f1f5f9] flex items-center justify-between gap-2">
              <BrandLogo size={36} />
              <button type="button" onClick={() => setOpen(false)} className="p-2 rounded-lg text-[#505f76]" aria-label="Đóng menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            {nav}
            {userSlot && <div className="border-t border-[#f1f5f9] p-3">{userSlot}</div>}
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-5 pb-28 lg:pb-8">{children}</main>

      {/* Bottom nav mobile, Quét QR ở giữa */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#e2e8f0] grid grid-cols-5 pb-[env(safe-area-inset-bottom)]" aria-label="Điều hướng nhanh">
        {bottomNav.map((href) => {
          const item = navItems.find((n) => n.href === href)!;
          const Icon = item.icon;
          if (href === "/quet")
            return (
              <Link key={href} href={href} className="flex flex-col items-center -mt-6" aria-label={item.label}>
                <span className="w-14 h-14 rounded-full bg-[#0e7c86] text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-semibold text-[#0e7c86] mt-0.5">{item.short}</span>
              </Link>
            );
          return (
            <Link key={href} href={href} className={`flex flex-col items-center justify-center py-2 text-[10px] font-medium ${isActive(path, href) ? "text-[#0e7c86]" : "text-[#64748b]"}`}>
              <Icon className="w-5 h-5 mb-0.5" />
              {item.short}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
