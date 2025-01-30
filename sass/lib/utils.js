// lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge Tailwind classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}