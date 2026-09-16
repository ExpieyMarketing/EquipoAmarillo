"use client";

import { useSyncExternalStore } from "react";

type Scheme = "light" | "dark";

function readScheme(): Scheme {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(callback: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);

  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  return () => {
    media.removeEventListener("change", callback);
    observer.disconnect();
  };
}

export function useColorScheme(): Scheme {
  return useSyncExternalStore(subscribe, readScheme, () => "light");
}
