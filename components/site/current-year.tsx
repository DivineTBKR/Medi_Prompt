"use client";

import { useSyncExternalStore } from "react";

// No-op subscription: the year only changes when the page is (re)loaded.
const subscribe = () => () => {};

// Shows the current year without blocking static prerendering.
export function CurrentYear() {
  const year = useSyncExternalStore<number | "">(
    subscribe,
    () => new Date().getFullYear(),
    () => "",
  );

  return <span suppressHydrationWarning>{year}</span>;
}
