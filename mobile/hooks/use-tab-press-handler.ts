import { usePathname, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useRef } from "react";

/**
 * Хук для создания обработчика нажатия на вкладку
 * При нажатии на активную вкладку (если не на начальном экране) возвращает на начальный экран
 *
 * @param tabName - Имя вкладки (например, "arts", "warehouse", "refiling")
 * @returns Обработчик события tabPress
 *
 * @example
 * const handleArtsTabPress = useTabPressHandler("arts");
 *
 * <Tabs.Screen
 *   name="arts"
 *   listeners={{
 *     tabPress: handleArtsTabPress,
 *   }}
 * />
 */
export function useTabPressHandler(tabName: string) {
  const pathname = usePathname();
  const segments = useSegments();
  const router = useRouter();

  // Храним актуальный pathname в ref для избежания проблем с замыканиями
  const pathnameRef = useRef(pathname);
  const segmentsRef = useRef(segments);

  // Обновляем ref при изменении pathname и segments
  useEffect(() => {
    pathnameRef.current = pathname;
    segmentsRef.current = segments;
  }, [pathname, segments]);

  return useCallback(
    (e: any) => {
      // Используем актуальное значение из ref вместо замыканного pathname
      const currentPath = pathnameRef.current;
      const currentSegments = segmentsRef.current;
      const tabPath = `/(tabs)/${tabName}`;

      // Проверяем двумя способами для надежности:
      // 1. По pathname
      const isOnTabByPath = currentPath.startsWith(tabPath);
      // 2. По segments (более надежно, работает даже при прямом переходе на вложенные маршруты)
      const isOnTabBySegments =
        currentSegments.length >= 2 &&
        currentSegments[0] === "(tabs)" &&
        currentSegments[1] === tabName;

      const isOnTab = isOnTabByPath || isOnTabBySegments;

      // Проверяем, находимся ли мы на index этой вкладки
      // Нормализуем путь для проверки (убираем trailing slash)
      const normalizedPath = currentPath.replace(/\/$/, "");
      const isOnTabIndex =
        normalizedPath === tabPath ||
        (currentSegments.length === 2 &&
          currentSegments[0] === "(tabs)" &&
          currentSegments[1] === tabName);

      // Если мы на вкладке, но не на index, сбрасываем на index
      // Это работает даже если мы пришли на эту вкладку напрямую с другой
      if (isOnTab && !isOnTabIndex) {
        e.preventDefault();
        // Используем replace вместо push для более надежной навигации
        // Заменяем текущий маршрут на index вкладки
        setTimeout(() => {
          router.replace(tabPath as any);
        }, 0);
      }
      // Если мы не на этой вкладке, React Navigation сам переключит вкладку
      // Если мы уже на index этой вкладки, ничего не делаем (React Navigation обработает)
    },
    [router, tabName]
  );
}
