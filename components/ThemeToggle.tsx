"use client";

import { useEffect } from "react";
import { useColorScheme } from "@/lib/use-color-scheme";

export function ThemeToggle() {
  const theme = useColorScheme();

  // Apply a previously stored preference to the DOM on first mount; useColorScheme
  // picks it up via its MutationObserver, so no local state is needed here.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // localStorage unavailable; fall back to OS preference only.
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={toggle}
      className="rounded-md border px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:text-ink transition-colors"
      aria-label="Cambiar tema claro/oscuro"
      type="button"
    >
      {theme === "dark" ? "☀️ Claro" : "☽ Oscuro"}
    </button>
  );
}
