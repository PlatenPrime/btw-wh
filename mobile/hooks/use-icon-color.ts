import { useTheme } from '@/providers/theme-provider';
import { Colors } from '@/constants/theme';

/**
 * Хук для получения цвета иконки в зависимости от текущей темы
 * @returns Цвет иконки для текущей темы
 */
export function useIconColor(): string {
  const { resolvedTheme } = useTheme();
  // Используем text вместо icon для темной темы, так как icon слишком темный
  return resolvedTheme === 'dark' ? Colors.dark.icon : Colors.light.icon;
}

