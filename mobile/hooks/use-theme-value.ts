import { useTheme } from "@/providers/theme-provider";

/**
 * Простой хук для получения текущей темы
 * Возвращает 'light' или 'dark' в зависимости от resolvedTheme
 * 
 * @returns 'light' | 'dark'
 * 
 * @example
 * const theme = useThemeValue();
 * // theme === 'light' или 'dark'
 */
export function useThemeValue(): 'light' | 'dark' {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'dark' ? 'dark' : 'light';
}
