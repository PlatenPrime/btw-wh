# CardActionsMenu

Универсальный компонент для управления действиями в карточках с dropdown menu. Решает проблему конфликта между Radix UI Dialog и Dropdown Menu.

## Особенности

- ✅ Решает конфликт Dialog + Dropdown через `setTimeout`
- ✅ Поддержка вертикальной и горизонтальной ориентации точек
- ✅ Группировка действий (default и destructive)
- ✅ Настраиваемые размеры (sm, md)
- ✅ Цветные иконки
- ✅ Переиспользуемость

## Использование

### Базовый пример

```tsx
import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

function MyCardActions() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

  return (
    <>
      <CardActionsMenu actions={actions} orientation="vertical" size="sm" />

      {/* Ваши диалоги с управляемым состоянием */}
      <EditDialog open={isEditOpen} onOpenChange={setIsEditOpen} />
      <DeleteDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    </>
  );
}
```

### Горизонтальные точки

```tsx
<CardActionsMenu actions={actions} orientation="horizontal" size="md" />
```

### Кастомный trigger

```tsx
<CardActionsMenu actions={actions} trigger={<Button>Дії</Button>} />
```

### С цветными иконками

```tsx
const actions: CardAction[] = [
  {
    id: "approve",
    label: "Підтвердити",
    icon: Check,
    iconColor: "emerald",
    onClick: () => handleApprove(),
  },
  {
    id: "reject",
    label: "Відхилити",
    icon: X,
    iconColor: "rose",
    variant: "destructive",
    onClick: () => handleReject(),
  },
];
```

## Props

### CardActionsMenuProps

| Prop          | Type                           | Default      | Description                                       |
| ------------- | ------------------------------ | ------------ | ------------------------------------------------- |
| `actions`     | `CardAction[]`                 | **required** | Массив действий для отображения                   |
| `trigger`     | `React.ReactNode`              | `undefined`  | Кастомный trigger (по умолчанию иконка с точками) |
| `orientation` | `"horizontal" \| "vertical"`   | `"vertical"` | Ориентация точек                                  |
| `size`        | `"sm" \| "md"`                 | `"sm"`       | Размер кнопки и меню                              |
| `align`       | `"start" \| "center" \| "end"` | `"end"`      | Выравнивание меню относительно trigger            |

### CardAction

| Prop        | Type                                        | Description                       |
| ----------- | ------------------------------------------- | --------------------------------- |
| `id`        | `string`                                    | Уникальный идентификатор действия |
| `label`     | `string`                                    | Текст действия                    |
| `icon`      | `LucideIcon`                                | Иконка (опционально)              |
| `iconColor` | `"emerald" \| "rose" \| "red" \| "default"` | Цвет иконки (опционально)         |
| `variant`   | `"default" \| "destructive"`                | Вариант отображения               |
| `onClick`   | `() => void`                                | Обработчик клика                  |

## Важно

### Controlled Dialogs

Диалоги должны поддерживать управляемое состояние (controlled component pattern):

```tsx
interface MyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // ... другие props
}
```

Внутри диалога:

```tsx
export function MyDialog({ open: controlledOpen, onOpenChange, ... }) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  // ... использовать open и setOpen
}
```

### Группировка действий

Действия автоматически группируются:

- Default действия отображаются первыми
- Destructive действия в конце после разделителя

## Примеры использования в проекте

- `PosCardActions` - действия в карточках позиций
