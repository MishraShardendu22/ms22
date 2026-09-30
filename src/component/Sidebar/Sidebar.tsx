"use client";

import { Pin, PinOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SidebarSearchButton } from "@/component/Search";
import { CDN_GO_SVG } from "@/static/cdn";
import { NAV_ITEMS } from "@/static/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Restore pinned state from localStorage on mount (client-only)
  useEffect(() => {
    try {
      setIsPinned(localStorage.getItem("dock-pinned") === "true");
    } catch {
      // localStorage unavailable (private browsing, etc.)
    }
  }, []);

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    if (href.startsWith("http")) return false;
    return pathname.startsWith(href);
  };

  // Primary navigation items: Home, Education, Timeline, Projects, Experience, Volunteer, Certificates, Agent Skills
  const primaryItems = NAV_ITEMS.slice(0, 8);
  // Secondary / utility navigation items: Socials, Contact, Blog
  const secondaryItems = NAV_ITEMS.slice(8);

  const handleMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isPinned) return;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 420);
  }, [isPinned]);

  // Global mousemove trigger: hovering towards left (within 32px of the left screen edge) reveals the dock
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 32) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsOpen(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const isDockVisible = isOpen || isPinned;

  return (
    <>
      {/* Invisible edge trigger strip on the left of viewport */}
      <div
        onMouseEnter={handleMouseEnter}
        className="fixed left-0 top-0 bottom-0 w-8 z-40 bg-transparent"
        aria-hidden="true"
      />

      {/* Subtle edge peek indicator when dock is hidden */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-r-full bg-[#d9a55b]/40 shadow-[0_0_12px_rgba(217,165,91,0.4)] transition-all duration-300 z-30 pointer-events-none ${
          isDockVisible
            ? "opacity-0 -translate-x-full"
            : "opacity-100 translate-x-0"
        }`}
        aria-hidden="true"
      />

      {/* Ubuntu-style Floating Dock with physical swoop in/out */}
      <nav
        aria-label="Main navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transition:
            "transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 380ms ease",
          willChange: "transform, opacity",
        }}
        className={`fixed left-3 top-1/2 -translate-y-1/2 z-50 w-[58px] max-h-[calc(100vh-2.5rem)] bg-[#120f0d]/94 backdrop-blur-2xl border border-[#2f2923] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.92),0_0_32px_rgba(217,165,91,0.08)] flex flex-col items-center py-2 px-1.5 select-none ${
          isDockVisible
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-[calc(100%+24px)] opacity-0 pointer-events-none"
        }`}
      >
        {/* Top Logo / Home Link */}
        <div className="flex items-center justify-center shrink-0 mb-1">
          <Link
            href="/"
            className="group nav-tooltip relative flex items-center justify-center p-1 rounded-lg transition-transform hover:scale-105"
            data-tooltip="Shardendu Mishra"
            aria-label="Shardendu Mishra Home"
          >
            <Image
              src={CDN_GO_SVG}
              alt="Golang Logo"
              width={32}
              height={32}
              unoptimized
              className="h-7 w-7 object-contain"
            />
          </Link>
        </div>

        <div className="w-6 border-t border-[#2f2923]/60 shrink-0 my-1" />

        {/* Scrollable Navigation List */}
        <div className="flex-1 w-full flex flex-col items-center space-y-1 overflow-y-auto sidebar-scroll py-0.5">
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
                    ? "bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]/90 shadow-xs"
                    : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613] border border-transparent"
                }`}
                data-tooltip={item.name}
                aria-label={item.name}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Ubuntu-style active indicator dot on the left */}
                {isActive && (
                  <span
                    className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-[#d9a55b] shadow-[0_0_8px_rgba(217,165,91,0.9)] ring-2 ring-[#120f0d]"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className="w-[18px] h-[18px] shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </Link>
            );
          })}

          {/* Subtle Activity Bar Divider */}
          <div className="w-6 border-t border-[#2f2923]/60 shrink-0 my-1.5" />

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
                    ? "bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]/90 shadow-xs"
                    : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613] border border-transparent"
                }`}
                data-tooltip={item.name}
                aria-label={item.name}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Ubuntu-style active indicator dot on the left */}
                {isActive && (
                  <span
                    className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-[#d9a55b] shadow-[0_0_8px_rgba(217,165,91,0.9)] ring-2 ring-[#120f0d]"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className="w-[18px] h-[18px] shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Dock Pin/Unpin Toggle */}
        <div className="w-6 border-t border-[#2f2923]/60 shrink-0 my-1" />
        <button
          type="button"
          onClick={() => {
            const next = !isPinned;
            setIsPinned(next);
            try {
              localStorage.setItem("dock-pinned", String(next));
            } catch {
              // localStorage unavailable
            }
          }}
          className="nav-tooltip group relative flex items-center justify-center w-8 h-8 rounded-lg text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613] transition-colors cursor-pointer"
          data-tooltip={isPinned ? "Unpin (Auto-hide)" : "Pin Dock"}
          aria-label={isPinned ? "Unpin Dock" : "Pin Dock"}
        >
          {isPinned ? (
            <PinOff className="w-3.5 h-3.5 text-[#d9a55b]" />
          ) : (
            <Pin className="w-3.5 h-3.5" />
          )}
        </button>
      </nav>
    </>
  );
}
