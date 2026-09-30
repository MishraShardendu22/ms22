"use client";

import { Command, Search } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import type { SearchButtonTheme } from "@/constants/theme";
import type { SearchResultType } from "@/static/api/api.types";

let modalState = {
  open: false,
  filter: undefined as SearchResultType | undefined,
};

const serverModalSnapshot = {
  open: false,
  filter: undefined as SearchResultType | undefined,
};

const listeners = new Set<() => void>();
const notify = () => {
  for (const listener of listeners) {
    listener();
  }
};

export const openSearchModal = (filter?: SearchResultType) => {
  modalState = { open: true, filter };
  notify();
};

export const closeSearchModal = () => {
  modalState = { open: false, filter: undefined };
  notify();
};

const subscribeModal = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const getModalSnapshot = () => modalState;
const getServerModalSnapshot = () => serverModalSnapshot;

interface HeaderSearchButtonProps {
  filterType?: SearchResultType;
  label?: string;
  theme?: SearchButtonTheme;
}

export function HeaderSearchButton({
  filterType,
  label = "Search",
  theme: _theme = "violet",
}: HeaderSearchButtonProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearchModal(filterType);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filterType]);

  return (
    <button
      type="button"
      onClick={() => openSearchModal(filterType)}
      className="flex items-center gap-2 px-3.5 py-2 bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#413930] rounded-xl text-[#b9ae9d] hover:text-[#f3ebdd] transition-all cursor-pointer shadow-sm"
      aria-label="Search"
    >
      <Search className="w-4 h-4 text-[#d9a55b]" />
      <span className="text-sm font-medium">{label}</span>
      <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-[#1e1a16] rounded-md border border-[#2f2923] font-semibold text-[#8e8374]">
        <Command className="w-2.5 h-2.5" />K
      </kbd>
    </button>
  );
}

export function useModalState() {
  return useSyncExternalStore(
    subscribeModal,
    getModalSnapshot,
    getServerModalSnapshot,
  );
}
