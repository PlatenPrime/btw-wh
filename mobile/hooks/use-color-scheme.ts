import { useColorScheme as useRNColorScheme } from 'react-native';
import { useTheme } from '@/providers/theme-provider';

export function useColorScheme() {
  try {
    const { resolvedTheme } = useTheme();
    return resolvedTheme;
  } catch {
    // Fallback на системный useColorScheme, если ThemeProvider недоступен
    return useRNColorScheme();
  }
}
