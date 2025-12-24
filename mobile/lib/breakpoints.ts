import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

/**
 * Стандартные breakpoints (в пикселях)
 */
const BREAKPOINTS = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Получает текущий breakpoint на основе ширины экрана
 */
export const getCurrentBreakpoint = (width: number): BreakpointKey => {
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'base';
};

/**
 * Получает значение для текущего breakpoint из объекта значений
 * Заменяет getBreakPointValue из @gluestack-ui/utils/hooks
 */
export const getBreakPointValue = <T>(
  values: Partial<Record<BreakpointKey, T>> | T,
  width?: number
): T | undefined => {
  if (typeof values !== 'object' || values === null) {
    return values as T;
  }

  const screenWidth = width ?? Dimensions.get('window').width;
  const currentBreakpoint = getCurrentBreakpoint(screenWidth);

  // Ищем значение для текущего breakpoint или ближайшего меньшего
  const breakpointOrder: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'base'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const key = breakpointOrder[i];
    if (key in values && values[key] !== undefined) {
      return values[key] as T;
    }
  }

  // Если ничего не найдено, возвращаем base или undefined
  return values.base as T | undefined;
};

/**
 * Хук для получения значения breakpoint на основе текущего размера экрана
 * Заменяет useBreakpointValue из @gluestack-ui/utils/hooks
 */
export const useBreakpointValue = <T>(
  values: Partial<Record<BreakpointKey, T>> | T
): T | undefined => {
  const [screenData, setScreenData] = useState<ScaledSize>(
    Dimensions.get('window')
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return getBreakPointValue(values, screenData.width);
};

