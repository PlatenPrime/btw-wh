# Миграция на CardActionsMenu

Руководство по миграции существующих карточек на использование `CardActionsMenu`.

## Пример: RowCardMenu

### До миграции

```tsx
// web/src/modules/rows/components/menus/row-card-menu/RowCardMenu.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { MoreVertical } from "lucide-react";

interface DeleteRowMenuProps {
  row: RowDto;
}

export function RowCardMenu({ row }: DeleteRowMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="">
          <DeleteRowDialog row={row} onSuccess={() => {}} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### После миграции

```tsx
// web/src/modules/rows/components/menus/row-card-menu/RowCardMenu.tsx
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";

interface DeleteRowMenuProps {
  row: RowDto;
  onSuccess?: () => void;
}

export function RowCardMenu({ row, onSuccess }: DeleteRowMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const actions: CardAction[] = [
    {
      id: "delete",
      label: "Видалити рядок",
      icon: Trash,
      variant: "destructive",
      onClick: () => setIsDeleteDialogOpen(true),
    },
  ];

  return (
    <>
      <CardActionsMenu
        actions={actions}
        orientation="vertical"
        size="sm"
        align="end"
      />

      <DeleteRowDialog
        row={row}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={onSuccess || (() => {})}
      />
    </>
  );
}
```

## Преимущества миграции

1. ✅ **Решение конфликта Dialog + Dropdown** - автоматически через `setTimeout`
2. ✅ **Консистентность** - единый стиль для всех карточек
3. ✅ **Гибкость** - легко добавить новые действия
4. ✅ **Читаемость** - декларативное описание действий

## Шаги миграции

### 1. Проверить диалоги на поддержку контролируемого состояния

Диалог должен принимать `open` и `onOpenChange`:

```tsx
interface MyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // ... другие props
}
```

Если не поддерживает - добавить:

```tsx
export function MyDialog({
  open: controlledOpen,
  onOpenChange,
  ...
}: MyDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  // Использовать open и setOpen далее
}
```

### 2. Заменить кастомный dropdown на CardActionsMenu

```tsx
// Убрать:
import { DropdownMenu, DropdownMenuContent, ... } from "@/components/ui/dropdown-menu";

// Добавить:
import { CardActionsMenu, type CardAction } from "@/components/shared/card-actions";
import { useState } from "react";
```

### 3. Создать состояние для каждого диалога

```tsx
const [isEditOpen, setIsEditOpen] = useState(false);
const [isDeleteOpen, setIsDeleteOpen] = useState(false);
```

### 4. Описать действия декларативно

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

### 5. Заменить JSX

```tsx
return (
  <>
    <CardActionsMenu actions={actions} orientation="vertical" size="sm" />

    <EditDialog
      open={isEditOpen}
      onOpenChange={setIsEditOpen}
      {...otherProps}
    />

    <DeleteDialog
      open={isDeleteOpen}
      onOpenChange={setIsDeleteOpen}
      {...otherProps}
    />
  </>
);
```

## Кандидаты на миграцию в проекте

- ✅ `PosCardActions` - **мигрирован**
- ⏳ `RowCardMenu` - использует старый dropdown
- ⏳ `PalletInRowCardView` - использует отдельные триггеры
- ⏳ Другие карточки с множественными действиями

## Когда НЕ использовать CardActionsMenu

- Карточка имеет только одно действие (используй простую кнопку)
- Действие не открывает диалог (может не быть проблемы с конфликтом)
- Нужна специфичная логика взаимодействия
