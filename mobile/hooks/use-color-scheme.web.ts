import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useTheme } from '@/providers/theme-provider';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  try {
    const { resolvedTheme } = useTheme();
    // Для веб-версии возвращаем тему после гидратации
    if (hasHydrated) {
      return resolvedTheme;
    }
    return 'light';
  } catch {
    // Fallback на системный useColorScheme
    const colorScheme = useRNColorScheme();
    if (hasHydrated) {
      return colorScheme;
    }
    return 'light';
  }
}
