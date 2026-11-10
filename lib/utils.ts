import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Joins class names together and removes conflicts, so later classes win.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
