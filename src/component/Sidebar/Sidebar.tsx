import Image from "next/image";
import Link from "next/link";
import { SidebarSearchButton } from "@/component/Search";
import { CDN_GO_SVG } from "@/static/cdn";
import { NAV_ITEMS } from "@/static/navigation";

export function Sidebar() {
  return (
    <>
      <nav
        className="fixed left-0 top-0 h-screen w-16 bg-background border-r border-border z-50"
        aria-label="Main navigation"
      >
        <div className="h-20 flex items-center justify-center border-b border-border">
          <Image
            src={CDN_GO_SVG}
            alt="Golang Logo"
            width={40}
            height={40}
            unoptimized
            className="h-10 w-10 object-contain"
            title="Shardendu Mishra"
          />
        </div>

        <div className="py-6 px-2 space-y-1 overflow-y-auto sidebar-scroll max-h-[calc(100vh-5rem)]">
          {/* Search Button */}
          <SidebarSearchButton />

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="nav-tooltip group relative flex items-center justify-center p-3 rounded-xl text-gray-400 hover:bg-surface-elevated hover:text-[#d9a55b] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#d9a55b] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                data-tooltip={item.name}
                aria-label={item.name}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="w-16 shrink-0" aria-hidden="true" />
    </>
  );
}
