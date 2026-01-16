import { useTheme } from "@/providers/theme-provider";

/**
 * Хук для получения цвета иконки в зависимости от текущей темы
 *
 * Цвет соответствует Tailwind классу text-typography-500
 * @returns Цвет иконки для текущей темы
 */
export function useIconColor(): string {
  const { resolvedTheme } = useTheme();
  // Используем text вместо icon для темной темы, так как icon слишком темный
  // Light: #687076, Dark: #A3A3A3 (соответствуют text-typography-500)
  return resolvedTheme === "dark" ? "#A3A3A3" : "#687076";
}
