import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatCurrency(
  amount: number,
  currency: string = "INR"
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SanityBilingualObject<T> = {
  english?: T;
  hindi?: T;
};

export function getBilingualContent<T>(bilingualObject: SanityBilingualObject<T> | null | undefined, language: "en" | "hi"): T | null | undefined {
  if (!bilingualObject) {
    return null;
  }
  // Fallback to English if the requested language content is not available
  return bilingualObject[language === "en" ? "english" : "hindi"] || bilingualObject["english"];
}
