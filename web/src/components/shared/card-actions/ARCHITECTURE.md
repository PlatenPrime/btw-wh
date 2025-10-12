# Архитектура CardActionsMenu

## Схема работы

```
┌─────────────────────────────────────────────────────────────┐
│                      КАРТОЧКА (Card)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   CardHeader                            │ │
│  │  ┌──────────────────────────┐  ┌──────────────────┐   │ │
│  │  │   Контент карточки       │  │ CardActionsMenu  │   │ │
│  │  │   (title, image, etc)    │  │      ⋮           │   │ │
│  │  └──────────────────────────┘  └──────────────────┘   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   CardContent                           │ │
│  │              (metrics, description)                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Поток взаимодействия

```
Пользователь                    CardActionsMenu              Dialog
    │                                  │                        │
    ├─ Click на ⋮ ───────────────────▶│                        │
    │                                  │                        │
    │                  ┌───────────────┴────────────────┐       │
    │                  │  Открывается DropdownMenu      │       │
    │                  └───────────────┬────────────────┘       │
    │                                  │                        │
    ├─ Click "Редагувати" ────────────▶│                        │
    │                                  │                        │
    │                  ┌───────────────┴────────────────┐       │
    │                  │  1. setOpen(false)            │       │
    │                  │  2. setTimeout(() => {        │       │
    │                  │       onClick()               │       │
    │                  │     }, 100)                   │       │
    │                  └───────────────┬────────────────┘       │
    │                                  │                        │
    │                                  ├─ onClick() ───────────▶│
    │                                  │                        │
    │                                  │        ┌───────────────┴─────┐
    │                                  │        │  Dialog открывается  │
    │                                  │        └───────────────┬─────┘
    │◀─────────────────────────────────┴────────────────────────┘
    │              Пользователь видит диалог
```

## Структура компонентов

```
CardActionsMenu (shared/card-actions/)
│
├── types.ts
│   ├── CardAction
│   ├── CardActionVariant
│   ├── CardActionIconColor
│   ├── CardActionsOrientation
│   └── CardActionsSize
│
├── CardActionsMenu.tsx
│   ├── State: [open, setOpen]
│   ├── Actions grouping
│   │   ├── defaultActions
│   │   └── destructiveActions
│   ├── handleActionClick(onClick)
│   │   └── setTimeout решение конфликта
│   └── DropdownMenu
│       ├── Trigger (icon based on orientation)
│       └── Content
│           ├── Default actions
│           ├── Separator (if both groups)
│           └── Destructive actions
│
└── index.ts (exports)
```

## Интеграция в карточку

```
PosCardActions
│
├── State Management
│   ├── [isUpdateDialogOpen, setIsUpdateDialogOpen]
│   └── [isDeleteDialogOpen, setIsDeleteDialogOpen]
│
├── Actions Definition
│   └── actions: CardAction[]
│       ├── Edit action → setIsUpdateDialogOpen(true)
│       └── Delete action → setIsDeleteDialogOpen(true)
│
├── Render
│   ├── <CardActionsMenu actions={actions} />
│   ├── <UpdatePosDialog
│   │     open={isUpdateDialogOpen}
│   │     onOpenChange={setIsUpdateDialogOpen} />
│   └── <DeletePosDialog
│         open={isDeleteDialogOpen}
│         onOpenChange={setIsDeleteDialogOpen} />
│
└── Parent: PosInPalletCardView
    └── <PosCardActions pos={pos} onSuccess={onSuccess} />
```

## Controlled Dialog Pattern

```
Dialog Component
│
├── Props
│   ├── open?: boolean              (controlled)
│   ├── onOpenChange?: (boolean) => void
│   ├── trigger?: ReactNode         (uncontrolled)
│   └── onSuccess?: () => void
│
├── Internal State
│   └── [internalOpen, setInternalOpen]
│
├── Logic
│   ├── isControlled = open !== undefined
│   ├── actualOpen = controlled ? open : internalOpen
│   └── actualSetOpen = controlled ? onOpenChange : setInternalOpen
│
└── Usage
    ├── Controlled: <Dialog open={x} onOpenChange={setX} />
    └── Uncontrolled: <Dialog trigger={<Button />} />
```

## Решение конфликта Radix UI

### Проблема

```
┌──────────────────────────────────────────────────────────┐
│ DropdownMenu (Portal)                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │ onClick → открыть Dialog                         │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────┐
│ Dialog (Portal) - НЕ открывается! ❌                    │
│ Причина: DropdownMenu еще не закрылся                   │
└──────────────────────────────────────────────────────────┘
```

### Решение

```
┌──────────────────────────────────────────────────────────┐
│ DropdownMenu                                             │
│  ┌─────────────────────────────────────────────────┐    │
│  │ onClick →                                        │    │
│  │   1. setOpen(false) ✅                          │    │
│  │   2. setTimeout(() => open Dialog, 100ms) ⏱️    │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
         │ 100ms delay
         ▼
┌──────────────────────────────────────────────────────────┐
│ Dialog (Portal) - открывается! ✅                       │
│ DropdownMenu уже закрылся                               │
└──────────────────────────────────────────────────────────┘
```

## Группировка действий

```
Input: actions[]
│
├── Filter by variant
│   ├── defaultActions (variant !== "destructive")
│   └── destructiveActions (variant === "destructive")
│
└── Render
    ├── defaultActions.map(...)
    ├── {hasMultipleGroups && <Separator />}
    └── destructiveActions.map(...)
```

### Примеры

```
[Edit, Copy, Delete] →
┌────────────────┐
│ ✏️ Edit       │ default
│ 📋 Copy       │ default
├────────────────┤ separator
│ 🗑️ Delete     │ destructive
└────────────────┘

[Edit, Copy] →
┌────────────────┐
│ ✏️ Edit       │ default
│ 📋 Copy       │ default
└────────────────┘
(no separator)

[Delete, Clear] →
┌────────────────┐
│ 🗑️ Delete     │ destructive
│ ❌ Clear      │ destructive
└────────────────┘
(no separator)
```

## Responsive Design

```
Orientation: vertical (⋮)    Orientation: horizontal (⋯)
Size: sm (6x6px)             Size: md (8x8px)

┌──┐                         ┌────┐
│⋮ │                         │ ⋯  │
└──┘                         └────┘

Use case:                    Use case:
- Компактные карточки        - Большие карточки
- Мобильные устройства       - Десктоп
- Grid с множеством карточек - Детальные view
```

## Типизация

```typescript
// Строгая типизация на всех уровнях

CardAction {
  id: string                           // Уникальный ID
  label: string                        // Текст действия
  icon?: LucideIcon                    // Опциональная иконка
  iconColor?: CardActionIconColor      // Цвет иконки
  variant?: CardActionVariant          // Вариант стиля
  onClick: () => void                  // Обработчик
}

// Enums для безопасности
type CardActionVariant = "default" | "destructive"
type CardActionIconColor = "emerald" | "rose" | "red" | "default"
type CardActionsOrientation = "horizontal" | "vertical"
type CardActionsSize = "sm" | "md"
```

## Расширяемость

### Добавить новый размер

```typescript
// types.ts
export type CardActionsSize = "sm" | "md" | "lg";

// CardActionsMenu.tsx
const sizeClasses = {
  sm: { button: "h-6 w-6", icon: "h-3 w-3", content: "w-40" },
  md: { button: "h-8 w-8", icon: "h-4 w-4", content: "w-48" },
  lg: { button: "h-10 w-10", icon: "h-5 w-5", content: "w-56" }, // new
};
```

### Добавить новый цвет

```typescript
// types.ts
export type CardActionIconColor =
  | "emerald"
  | "rose"
  | "red"
  | "blue"
  | "default";

// CardActionsMenu.tsx
const iconColorClasses: Record<CardActionIconColor, string> = {
  emerald: "text-emerald-500",
  rose: "text-rose-500",
  red: "text-red-500",
  blue: "text-blue-500", // new
  default: "",
};
```

## Performance

- ✅ **Минимальные ре-рендеры** - локальное состояние
- ✅ **Ленивые диалоги** - рендерятся только при открытии
- ✅ **Нет глобального стейта** - изолированные компоненты
- ✅ **Типизация** - проверка на этапе компиляции

## Best Practices

1. **Один компонент - одна ответственность**
   - CardActionsMenu - только UI меню
   - Parent компонент - управление диалогами

2. **Декларативность**
   - Действия описаны массивом объектов
   - Легко добавлять/удалять/модифицировать

3. **Композиция**
   - Переиспользуемый компонент
   - Гибкая настройка через props

4. **Типобезопасность**
   - Строгая типизация TypeScript
   - Autocomplete в IDE

5. **Accessibility**
   - ARIA labels
   - Keyboard navigation (Radix UI)
   - Focus management
