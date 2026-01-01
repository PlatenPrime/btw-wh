/**
 * Утилиты для работы с цветами
 * 
 * Этот файл содержит базовые утилиты для работы с hex цветами.
 * Для работы с Tailwind токенами используйте utils/color-tokens.ts
 */

/**
 * Преобразует hex цвет в rgba с указанной прозрачностью
 * 
 * @param hex - Hex цвет (например, "#a855f7" или "a855f7")
 * @param opacity - Прозрачность от 0 до 1 (например, 0.15 для 15%)
 * @returns RGBA строка (например, "rgba(168, 85, 247, 0.15)")
 * 
 * @example
 * const purpleBg = hexToRgba("#a855f7", 0.15); // "rgba(168, 85, 247, 0.15)"
 */
export function hexToRgba(hex: string, opacity: number): string {
  // Убираем # если есть
  const cleanHex = hex.replace("#", "");
  
  // Парсим hex в RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Валидирует hex цвет
 * 
 * @param hex - Hex цвет для валидации
 * @returns true, если hex цвет валиден
 */
export function isValidHex(hex: string): boolean {
  const hexPattern = /^#?[0-9A-Fa-f]{6}$/;
  return hexPattern.test(hex);
}

/**
 * Нормализует hex цвет (добавляет # если отсутствует)
 * 
 * @param hex - Hex цвет
 * @returns Нормализованный hex цвет с #
 */
export function normalizeHex(hex: string): string {
  return hex.startsWith('#') ? hex : `#${hex}`;
}

