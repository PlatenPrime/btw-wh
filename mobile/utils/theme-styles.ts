import { ViewStyle, TextStyle } from 'react-native';

/**
 * Утилиты для безопасного комбинирования стилей темы с кастомными
 */

/**
 * Комбинирует базовые стили темы с кастомными стилями
 * Кастомные стили имеют приоритет над базовыми
 * 
 * @param baseStyles - Базовые стили из темы
 * @param customStyles - Кастомные стили (опционально)
 * @returns Объединенные стили
 * 
 * @example
 * const baseStyles = { backgroundColor: card.bg, borderColor: card.border };
 * const customStyles = { padding: 16 };
 * const combined = combineThemeStyles(baseStyles, customStyles);
 */
export function combineThemeStyles<T extends ViewStyle | TextStyle>(
  baseStyles: T,
  customStyles?: Partial<T>
): T {
  if (!customStyles) {
    return baseStyles;
  }

  return {
    ...baseStyles,
    ...customStyles,
  };
}

/**
 * Создает объект стилей для карточки с поддержкой темы
 * 
 * @param bgColor - Цвет фона
 * @param borderColor - Цвет границы (опционально)
 * @param additionalStyles - Дополнительные стили (опционально)
 * @returns Объект стилей для View
 */
export function createCardStyles(
  bgColor: string,
  borderColor?: string,
  additionalStyles?: ViewStyle
): ViewStyle {
  const baseStyles: ViewStyle = {
    backgroundColor: bgColor,
  };

  if (borderColor) {
    baseStyles.borderColor = borderColor;
  }

  return combineThemeStyles(baseStyles, additionalStyles);
}

