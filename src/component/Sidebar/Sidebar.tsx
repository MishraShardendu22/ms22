"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarSearchButton } from "@/component/Search";
import { CDN_GO_SVG } from "@/static/cdn";
import { NAV_ITEMS } from "@/static/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    if (href.startsWith("http")) return false;
    return pathname.startsWith(href);
  };

  // Primary workspace navigation items: Home, Education, Timeline, Projects, Experience, Volunteer, Certificates, Agent Skills
  const primaryItems = NAV_ITEMS.slice(0, 8);
  // Secondary / utility navigation items: Socials, Contact, Blog
  const secondaryItems = NAV_ITEMS.slice(8);

  return (
    <>
      <nav
        className="fixed left-0 top-0 h-screen w-16 bg-[#120f0d]/95 backdrop-blur-md border-r border-[#2f2923] z-50 flex flex-col select-none"
        aria-label="Main navigation"
      >
        {/* Top Logo / Home Link */}
        <div className="h-14 flex items-center justify-center border-b border-[#2f2923]/60 shrink-0">
          <Link
            href="/"
            className="group nav-tooltip relative flex items-center justify-center p-1 rounded-lg transition-transform hover:scale-105"
            data-tooltip="Shardendu Mishra"
            aria-label="Shardendu Mishra Home"
          >
            <Image
              src={CDN_GO_SVG}
              alt="Golang Logo"
              width={34}
              height={34}
              unoptimized
              className="h-8 w-8 object-contain"
            />
          </Link>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-3 px-2 flex flex-col items-center space-y-1 overflow-y-auto sidebar-scroll">
          {/* Quick Search Trigger */}
          <SidebarSearchButton />

          {/* Primary Navigation Items */}
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-tooltip group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923] shadow-sm before:absolute before:-left-2 before:top-2.5 before:bottom-2.5 before:w-[3px] before:bg-[#d9a55b] before:rounded-r-full"
                    : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613] border border-transparent"
                }`}
                data-tooltip={item.name}
                aria-label={item.name}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className="w-[18px] h-[18px] shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </Link>
            );
          })}

          {/* Subtle Activity Bar Divider */}
          <div className="w-8 my-2 border-t border-[#2f2923]/60 shrink-0" />

          {/* Secondary Utilities & External Links */}
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.href);
            const isExternal = item.href.startsWith("http");

            return (
              <Link
                key={item.name}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`nav-tooltip group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923] shadow-sm before:absolute before:-left-2 before:top-2.5 before:bottom-2.5 before:w-[3px] before:bg-[#d9a55b] before:rounded-r-full"
                    : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613] border border-transparent"
                }`}
                data-tooltip={item.name}
                aria-label={item.name}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className="w-[18px] h-[18px] shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer to preserve layout offset */}
      <div className="w-16 shrink-0" aria-hidden="true" />
    </>
  );
}
