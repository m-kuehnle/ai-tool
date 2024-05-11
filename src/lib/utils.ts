import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Funktion zum Zählen der Wörter in einem Text
export const countWords = (text: string) => {
  return text.split(/\s+/).filter((word) => word !== "").length;
};


