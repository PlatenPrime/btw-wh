# CardActionsMenu - Резюме

## Что это?

Универсальная система управления действиями в карточках с решением конфликта Radix UI Dialog + Dropdown Menu.

## Основные файлы

```
web/src/components/shared/card-actions/
├── CardActionsMenu.tsx    # Основной компонент
├── types.ts               # TypeScript типы
├── index.ts               # Экспорты
├── README.md              # Документация
├── EXAMPLES.md            # Примеры использования
├── MIGRATION.md           # Руководство по миграции
└── SUMMARY.md             # Этот файл
```

## Быстрый старт

### 1. Импорт

```tsx
import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
```

### 2. Состояние

```tsx
const [isEditOpen, setIsEditOpen] = useState(false);
const [isDeleteOpen, setIsDeleteOpen] = useState(false);
```

### 3. Действия

```tsx
const actions: CardAction[] = [
  {
    id: "edit",
    label: "Редагувати",
    icon: Edit,
    variant: "default",
    onClick: () => setIsEditOpen(true),
  },
  {
    id: "delete",
    label: "Видалити",
    icon: Trash,
    variant: "destructive",
    onClick: () => setIsDeleteOpen(true),
  },
];
```

### 4. Рендер

```tsx
return (
  <>
    <CardActionsMenu
      actions={actions}
      orientation="vertical" // или "horizontal"
      size="sm" // или "md"
    />

    <EditDialog open={isEditOpen} onOpenChange={setIsEditOpen} />
    <DeleteDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
  </>
);
```

## Ключевые возможности

| Возможность                  | Значения                               | По умолчанию |
| ---------------------------- | -------------------------------------- | ------------ |
| **Ориентация**               | `vertical` ⋮ / `horizontal` ⋯          | `vertical`   |
| **Размер**                   | `sm` (6x6) / `md` (8x8)                | `sm`         |
| **Выравнивание**             | `start` / `center` / `end`             | `end`        |
| **Варианты действий**        | `default` / `destructive`              | -            |
| **Цвета иконок**             | `default` / `emerald` / `rose` / `red` | `default`    |
| **Автогруппировка**          | default ⇢ separator ⇢ destructive      | ✅           |
| **Конфликт Dialog+Dropdown** | Решён через setTimeout(100ms)          | ✅           |

## Визуальные варианты

### Вертикальные точки (компактно)

```tsx
<CardActionsMenu actions={actions} orientation="vertical" size="sm" />
```

→ ⋮ (6x6px)

### Горизонтальные точки (акцентно)

```tsx
<CardActionsMenu actions={actions} orientation="horizontal" size="md" />
```

→ ⋯ (8x8px)

## Применено в проекте

- ✅ **PosCardActions** - карточки позиций на паллетах
  - Редагування позиції
  - Видалення позиції

## Готово к использованию в

- ⏳ **RowCardMenu** - меню карточек рядов
- ⏳ **PalletCardActions** - действия с паллетами
- ⏳ **ArtCardActions** - действия с товарами
- ⏳ **AskCardActions** - действия с запросами

## Требования к диалогам

Диалоги должны поддерживать контролируемое состояние:

```tsx
interface MyDialogProps {
  open?: boolean; // Контролируемое состояние
  onOpenChange?: (open: boolean) => void; // Обработчик изменения
}
```

## Решаемые проблемы

1. ❌ **Конфликт Dialog + Dropdown в Radix UI**
   - ✅ Решено через controlled dialogs + setTimeout

2. ❌ **Повторение кода действий в карточках**
   - ✅ Единый переиспользуемый компонент

3. ❌ **Несогласованный UI действий**
   - ✅ Консистентный стиль во всех карточках

4. ❌ **Сложность добавления новых действий**
   - ✅ Декларативное описание массивом

## Документация

- **README.md** - Полная документация с API и примерами
- **EXAMPLES.md** - 10+ готовых примеров использования
- **MIGRATION.md** - Пошаговая миграция существующих карточек

## Техническая реализация

### Решение конфликта

```tsx
const handleActionClick = (onClick: () => void) => {
  setOpen(false); // 1. Закрываем dropdown
  setTimeout(() => {
    // 2. Ждем 100ms
    onClick(); // 3. Открываем диалог
  }, 100);
};
```

### Автогруппировка

```tsx
const defaultActions = actions.filter((a) => a.variant !== "destructive");
const destructiveActions = actions.filter((a) => a.variant === "destructive");

// Рендерим: default → separator → destructive
```

### Controlled + Uncontrolled режимы

```tsx
const isControlled = controlledOpen !== undefined;
const open = isControlled ? controlledOpen : internalOpen;
const setOpen = isControlled ? onOpenChange! : setInternalOpen;
```

## Поддержка

Компонент следует принципам:

- ✅ Clean Code
- ✅ SOLID
- ✅ DRY
- ✅ Composition over Inheritance
- ✅ TypeScript strict mode
- ✅ Accessibility (ARIA)

## Совместимость

- React 18+
- Radix UI Primitives
- Lucide React Icons
- Tailwind CSS
- TypeScript 5+

---

**Создан:** 2025-10-12  
**Версия:** 1.0.0  
**Статус:** ✅ Production Ready
