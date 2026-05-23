import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function surfaceCardClassName() {
  return "glass-card border-border/70"
}

export function interactiveCardClassName() {
  return "border-border/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevation-2"
}
