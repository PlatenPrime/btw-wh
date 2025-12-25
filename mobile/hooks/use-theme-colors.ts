import { useTheme } from '@/providers/theme-provider';
import { SemanticColors, Colors } from '@/constants/theme';

/**
 * Централизованный хук для получения цветов темы
 * Возвращает объект с цветами для текущей темы (light/dark)
 * 
 * @example
 * const { card, dialog, text } = useThemeColors();
 * <Box style={{ backgroundColor: card.bg, borderColor: card.border }} />
 */
export function useThemeColors() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return {
    theme,
    // Цвета для карточек
    card: {
      bg: SemanticColors.card.bg[theme],
      border: SemanticColors.card.border[theme],
    },
    // Цвета для диалогов и модальных окон
    dialog: {
      bg: SemanticColors.dialog.bg[theme],
      border: SemanticColors.dialog.border[theme],
    },
    // Цвета для ошибок
    error: {
      border: SemanticColors.error.border,
      text: SemanticColors.error.text,
      bg: SemanticColors.error.bg[theme],
    },
    // Цвета для sidebar
    sidebar: {
      border: SemanticColors.sidebar.border[theme],
    },
    // Цвета для текста
    text: {
      primary: Colors[theme].text,
      icon: Colors[theme].icon,
      tabIconDefault: Colors[theme].tabIconDefault,
      tabIconSelected: Colors[theme].tabIconSelected,
    },
    // Цвета для фона
    background: {
      primary: Colors[theme].background,
    },
    // Placeholder цвет
    placeholder: SemanticColors.placeholder[theme],
    // Цвета для Switch компонента
    switch: {
      track: {
        false: SemanticColors.switch.track.false[theme],
        true: SemanticColors.switch.track.true[theme],
      },
      thumb: SemanticColors.switch.thumb,
    },
    // Статические цвета (не зависят от темы)
    static: {
      primary: SemanticColors.primary,
      info: SemanticColors.info,
      destructive: SemanticColors.destructive,
      disabled: SemanticColors.disabled,
      white: SemanticColors.white,
      black: SemanticColors.black,
      shadow: SemanticColors.shadow,
      iconColors: SemanticColors.iconColors,
    },
  };
}

