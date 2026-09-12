import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function surfaceCardClassName() {
  return "glass-card border-border/70"
}

export function interactiveCardClassName() {
  return "card-3d border-border/70 transition-[box-shadow,background-color] duration-200 ease-out"
}
