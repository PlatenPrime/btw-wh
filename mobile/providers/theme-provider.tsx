import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useRNColorScheme } from 'react-native';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light';
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'light',
};

export const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'mobile-ui-theme',
  ...props
}: ThemeProviderProps) {
  const systemColorScheme = useRNColorScheme();
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загружаем сохраненную тему при монтировании
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(storageKey);
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
          setThemeState(savedTheme as Theme);
        }
      } catch (error) {
        console.error('Ошибка загрузки темы:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, [storageKey]);

  // Сохраняем тему при изменении
  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Ошибка сохранения темы:', error);
    }
  };

  // Определяем разрешенную тему (с учетом системной)
  const resolvedTheme: 'dark' | 'light' =
    theme === 'system' ? (systemColorScheme === 'dark' ? 'dark' : 'light') : theme;

  const value: ThemeProviderState = {
    theme,
    setTheme,
    resolvedTheme,
  };

  // Не рендерим до загрузки темы, чтобы избежать мигания
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme должен использоваться в пределах ThemeProvider');
  }

  return context;
};

