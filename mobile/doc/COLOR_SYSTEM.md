# Система управления цветами

Документация по использованию цветов в мобильном приложении.

## Содержание

1. [Архитектура системы](#архитектура-системы)
2. [Способы использования цветов](#способы-использования-цветов)
3. [Правила и рекомендации](#правила-и-рекомендации)
4. [Примеры использования](#примеры-использования)
5. [Миграция с старой системы](#миграция-со-старой-системы)

---

## Архитектура системы

Система цветов основана на едином источнике истины - **Tailwind токенах**, определенных в `components/ui/gluestack-ui-provider/config.ts`. Все цвета доступны через CSS переменные и автоматически поддерживают темную и светлую темы.

### Структура файлов

```
mobile/
├── constants/
│   ├── theme.ts              # Устаревшие цвета (обратная совместимость) + iconColors
│   └── theme-tokens.ts       # Маппинг семантических цветов на Tailwind токены
├── hooks/
│   ├── use-theme-colors.ts   # Основной хук для получения цветов темы
│   └── use-theme-token.ts    # Хук для работы с Tailwind токенами
├── utils/
│   ├── color-utils.ts        # Базовые утилиты для работы с hex цветами
│   └── color-tokens.ts       # Утилиты для работы с Tailwind токенами
└── components/ui/gluestack-ui-provider/
    └── config.ts             # Определение всех цветов через CSS переменные
```

### Доступные цветовые категории

- `primary`, `secondary`, `tertiary` - основные цвета
- `error`, `success`, `warning`, `info` - семантические цвета
- `typography` - цвета текста
- `outline` - цвета границ
- `background` - цвета фона

Каждая категория имеет оттенки: `0`, `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`

---

## Способы использования цветов

### 1. Tailwind классы (Приоритет для статических цветов)

Используйте Tailwind классы, когда цвет известен на этапе компиляции и не зависит от props или состояния.

**Формат**: `{property}-{category}-{shade}`

**Примеры**:
```tsx
// ✅ Правильно - статический цвет
<View className="bg-background-0 border border-outline-100" />
<Text className="text-typography-900" />
<View className="bg-primary-500" />
```

**Когда использовать**:
- Для стандартных элементов с фиксированными цветами
- Когда цвет не зависит от props или состояния
- Для большинства стандартных компонентов

### 2. Хуки для динамических цветов

Используйте хуки, когда цвет зависит от состояния, props или вычисляется динамически.

#### `useThemeColors()` - Основной хук

Возвращает объект с цветами для текущей темы.

```tsx
import { useThemeColors } from '@/hooks/use-theme-colors';

function MyComponent() {
  const { card, dialog, text, error, success } = useThemeColors();

  return (
    <View style={{
      backgroundColor: card.bg,
      borderColor: card.border,
    }}>
      <Text style={{ color: text.primary }}>Текст</Text>
    </View>
  );
}
```

**Доступные цвета**:
- `card.bg`, `card.border` - цвета для карточек
- `dialog.bg`, `dialog.border` - цвета для диалогов
- `error.bg`, `error.border`, `error.text` - цвета для ошибок
- `success`, `warning`, `info` - аналогично error
- `text.primary`, `text.secondary`, `text.icon` - цвета текста
- `background.primary`, `background.secondary`, `background.muted` - цвета фона
- `sidebar.border` - цвет границы sidebar
- `placeholder` - цвет placeholder
- `switch.track`, `switch.thumb` - цвета для Switch
- `static.*` - статические цвета (iconColors, primary, info и т.д.)

#### `useThemeToken()` - Работа с токенами

Для получения токенов программно.

```tsx
import { 
  useThemeToken,
  useThemeTokenHex,
  useThemeTokenWithOpacity,
  useThemeTokenClassName 
} from '@/hooks/use-theme-token';

function MyComponent() {
  // Получить токен
  const token = useThemeToken('card.bg'); // 'background-0'
  
  // Получить hex цвет
  const hex = useThemeTokenHex('primary-500'); // '#333333'
  
  // Получить цвет с opacity
  const color = useThemeTokenWithOpacity('primary-500', 0.15); // 'rgba(51, 51, 51, 0.15)'
  
  // Получить Tailwind класс
  const className = useThemeTokenClassName('card.bg', 'bg'); // 'bg-background-0'
}
```

### 3. Утилиты для манипуляций

#### Работа с opacity

```tsx
import { hexToRgba } from '@/utils/color-utils';
import { getTokenColorWithOpacity } from '@/utils/color-tokens';

// Для hex цветов (например, из iconColors)
const bgColor = hexToRgba('#a855f7', 0.15); // 'rgba(168, 85, 247, 0.15)'

// Для токенов
const bgColor = getTokenColorWithOpacity('primary-500', 0.15, 'light');
```

---

## Правила и рекомендации

### Правило 1: Tailwind классы для статических цветов

```tsx
// ✅ Правильно
<View className="bg-background-0 border border-outline-100" />

// ❌ Неправильно - использование style для статического цвета
const { card } = useThemeColors();
<View style={{ backgroundColor: card.bg }} />
```

### Правило 2: Хуки для динамических цветов

```tsx
// ✅ Правильно - цвет зависит от props
const { card } = useThemeColors();
<View style={{ backgroundColor: card.bg }} />

// ✅ Правильно - цвет вычисляется динамически
const bgColor = variant === 'error' ? colors.error.bg : colors.card.bg;
<View style={{ backgroundColor: bgColor }} />
```

### Правило 3: Не смешивать style и className для одного свойства

```tsx
// ❌ Неправильно - конфликт между className и style
<View className="bg-background-0" style={{ backgroundColor: card.bg }} />

// ✅ Правильно - используйте один подход
<View className="bg-background-0" />
// или
<View style={{ backgroundColor: card.bg }} />
```

### Правило 4: Использование iconColors

`iconColors` - это статические hex цвета, не представленные в Tailwind токенах. Используйте их напрямую:

```tsx
import { SemanticColors } from '@/constants/theme';
import { hexToRgba } from '@/utils/color-utils';

const iconColor = SemanticColors.iconColors.purple;
const bgColor = hexToRgba(iconColor, 0.15);
```

### Правило 5: Динамические классы не работают

Tailwind не поддерживает динамическую генерацию классов в runtime.

```tsx
// ❌ Неправильно - не работает
<View className={`bg-${color}-500`} />

// ✅ Правильно - используйте style или условные классы
<View style={{ backgroundColor: getColor(color) }} />
// или
<View className={color === 'primary' ? 'bg-primary-500' : 'bg-error-500'} />
```

---

## Примеры использования

### Пример 1: Карточка со стандартными цветами

```tsx
// ✅ Используем Tailwind классы
<View className="p-4 rounded-lg border border-outline-100 bg-background-0">
  <Text className="text-typography-900">Заголовок</Text>
  <Text className="text-typography-600">Описание</Text>
</View>
```

### Пример 2: Карточка с динамическим цветом

```tsx
function StatusCard({ variant }: { variant: 'success' | 'error' }) {
  const { success, error } = useThemeColors();
  
  const colors = variant === 'success' ? success : error;
  
  return (
    <View
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
    >
      <Text style={{ color: colors.text }}>Статус</Text>
    </View>
  );
}
```

### Пример 3: Цвет с opacity

```tsx
import { SemanticColors } from '@/constants/theme';
import { hexToRgba } from '@/utils/color-utils';

function ColoredButton({ color }: { color: keyof typeof SemanticColors.iconColors }) {
  const iconColor = SemanticColors.iconColors[color];
  const bgColor = hexToRgba(iconColor, 0.15);
  const borderColor = hexToRgba(iconColor, 0.9);
  
  return (
    <Pressable
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: 1,
      }}
    >
      <Icon color={iconColor} />
    </Pressable>
  );
}
```

### Пример 4: Использование Themed компонентов

```tsx
import { ThemedView, ThemedText } from '@/components/themed/themed-view';
import { Card } from '@/components/ui';

// ThemedView автоматически применяет bg-background-0
<ThemedView className="p-4 rounded-lg border border-outline-100">
  <ThemedText type="defaultSemiBold">Заголовок</ThemedText>
</ThemedView>

// Card компонент с вариантами
<Card variant="outlined" className="p-4">
  <ThemedText>Содержимое</ThemedText>
</Card>
```

---

## Миграция со старой системы

### Было (старая система)

```tsx
import { SemanticColors } from '@/constants/theme';
import { useTheme } from '@/providers/theme-provider';

function OldComponent() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  return (
    <View style={{
      backgroundColor: SemanticColors.card.bg[theme],
      borderColor: SemanticColors.card.border[theme],
    }}>
      <Text style={{ color: SemanticColors.error.text }}>
        Текст
      </Text>
    </View>
  );
}
```

### Стало (новая система)

```tsx
import { useThemeColors } from '@/hooks/use-theme-colors';

function NewComponent() {
  const { card, error } = useThemeColors();
  
  // Вариант 1: Используем Tailwind классы (для статических цветов)
  return (
    <View className="bg-background-0 border border-outline-100">
      <Text className="text-error-500">Текст</Text>
    </View>
  );
  
  // Вариант 2: Используем хуки (для динамических цветов)
  return (
    <View style={{
      backgroundColor: card.bg,
      borderColor: card.border,
    }}>
      <Text style={{ color: error.text }}>Текст</Text>
    </View>
  );
}
```

---

## Чеклист при использовании цветов

- [ ] Для статических цветов используется `className` с Tailwind классами
- [ ] Для динамических цветов используется `useThemeColors()` через `style`
- [ ] Не смешиваются `className` и `style` для одного свойства
- [ ] Для opacity используются утилиты `hexToRgba()` или `getTokenColorWithOpacity()`
- [ ] `iconColors` используются напрямую из `SemanticColors.iconColors`
- [ ] Нет хардкодных hex цветов (кроме `iconColors`)

---

## Полезные ссылки

- `constants/theme-tokens.ts` - маппинг семантических цветов на токены
- `hooks/use-theme-colors.ts` - основной хук для получения цветов
- `hooks/use-theme-token.ts` - хуки для работы с токенами
- `utils/color-tokens.ts` - утилиты для работы с токенами
- `utils/color-utils.ts` - базовые утилиты для hex цветов

---

_Последнее обновление: 2025-01-27_

