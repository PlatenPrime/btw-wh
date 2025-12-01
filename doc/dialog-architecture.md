# Архитектура диалогов в проекте

## Общие принципы

Все диалоги в проекте должны следовать единой архитектуре с разделением ответственности:

- **Логика** отделена от **отрисовки**
- **Переиспользуемость** компонентов
- **Консистентность** использования UI-компонентов
- **Тестируемость** за счет изоляции логики

## Структура диалога

Каждый диалог должен состоять из следующих файлов:

```
dialogs/
  [dialog-name]/
    [DialogName].tsx              # Основной компонент (объединяет хук и View)
    [DialogName]View.tsx          # Компонент отрисовки UI
    use[DialogName].ts            # Хук с бизнес-логикой
    [DialogName]Trigger.tsx       # Опционально: компонент-триггер для открытия
    index.ts                      # Экспорты
```

## Компоненты диалога

### 1. Основной компонент (`[DialogName].tsx`)

**Назначение:** Объединяет хук с логикой и View-компонент с отрисовкой.

**Обязанности:**

- Управление состоянием открытия/закрытия диалога через `Dialog` из `@/components/ui/dialog`
- Вызов хука для получения логики
- Передача данных и обработчиков в View-компонент
- Обработка закрытия диалога после успешных операций

**Пример:**

```typescript
import { Dialog } from "@/components/ui/dialog";
import type { EntityDto } from "@/modules/entity/api/types";
import { DeleteEntityDialogView } from "./DeleteEntityDialogView";
import { useDeleteEntityDialog } from "./useDeleteEntityDialog";

interface DeleteEntityDialogProps {
  entity: EntityDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteEntityDialog({
  entity,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteEntityDialogProps) {
  const { isDeleting, handleDelete } = useDeleteEntityDialog({
    entity,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DeleteEntityDialogView
        entity={entity}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
```

**Важно:**

- `Dialog` оборачивает только View-компонент, не содержит логику
- Обработчики закрытия (`handleCancel`, `handleDeleteAndClose`) создаются в основном компоненте
- Хук не должен управлять состоянием открытия/закрытия диалога

### 2. Хук (`use[DialogName].ts`)

**Назначение:** Содержит всю бизнес-логику диалога.

**Обязанности:**

- Работа с мутациями (API-запросы)
- Вычисления и валидация данных
- Обработка ошибок
- Управление состоянием загрузки

**Пример для диалога с мутацией:**

```typescript
import { useDeleteEntityMutation } from "@/modules/entity/api/hooks/mutations/useDeleteEntityMutation";
import type { EntityDto } from "@/modules/entity/api/types";

interface UseDeleteEntityDialogProps {
  entity: EntityDto;
  onSuccess?: () => void;
}

interface UseDeleteEntityDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteEntityDialog({
  entity,
  onSuccess,
}: UseDeleteEntityDialogProps): UseDeleteEntityDialogReturn {
  const mutation = useDeleteEntityMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(entity._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
```

**Пример для простого диалога (управление открытием/закрытием):**

```typescript
interface UseCreateEntityDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateEntityDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateEntityDialog({
  onOpenChange,
}: UseCreateEntityDialogProps): UseCreateEntityDialogReturn {
  const handleSuccess = () => {
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return {
    handleSuccess,
    handleCancel,
  };
}
```

**Важно:**

- Хук не должен управлять состоянием открытия диалога напрямую
- Все вычисления должны быть в хуке (например, `useMemo`, `useCallback`)
- Обработка ошибок должна быть в хуке

### 3. View-компонент (`[DialogName]View.tsx`)

**Назначение:** Отвечает только за отрисовку UI диалога.

**Обязанности:**

- Рендеринг `DialogContent`, `DialogHeader`, `DialogTitle`
- Отображение данных
- Использование `DialogActions` для кнопок действий
- Передача обработчиков в дочерние компоненты

**Пример:**

```typescript
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EntityDto } from "@/modules/entity/api/types";

interface DeleteEntityDialogViewProps {
  entity: EntityDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteEntityDialogView({
  entity,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteEntityDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити сутність</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити {entity.title}? Це дію неможливо
          скасувати.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isDeleting}
          submitText="Видалити"
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
```

**Важно:**

- View-компонент не должен содержать логику (хуки, вычисления, мутации)
- Всегда используйте `DialogActions` вместо ручного создания кнопок
- View-компонент получает все данные через props

### 4. Компонент-триггер (`[DialogName]Trigger.tsx`) - опционально

**Назначение:** Кнопка или другой элемент, который открывает диалог.

**Используется когда:** Диалог должен открываться по клику на кнопку внутри другого компонента.

**Пример:**

```typescript
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import type { EntityDto } from "@/modules/entity/api/types";

interface DeleteEntityDialogTriggerProps {
  entity: EntityDto;
  isDisabled?: boolean;
}

export function DeleteEntityDialogTrigger({
  entity,
  isDisabled,
}: DeleteEntityDialogTriggerProps) {
  return (
    <DialogTrigger asChild>
      <Button variant="destructive" size="sm" disabled={isDisabled}>
        <Trash2 className="size-4" />
        Видалити
      </Button>
    </DialogTrigger>
  );
}
```

**Использование:**

```typescript
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DeleteEntityDialogTrigger entity={entity} />
  <DeleteEntityDialog
    entity={entity}
    open={isDialogOpen}
    onOpenChange={setIsDialogOpen}
  />
</Dialog>
```

## Типы диалогов

### 1. Диалог с мутацией (Delete, Update)

**Характеристики:**

- Содержит мутацию в хуке
- Имеет состояние загрузки (`isDeleting`, `isUpdating`)
- Использует `DialogActions` с `variant="destructive"` для деструктивных действий

**Примеры:** `DeleteSegmentDialog`, `DeleteBlockDialog`, `RemoveZoneFromSegmentDialog`

### 2. Диалог с формой (Create, Edit)

**Характеристики:**

- Логика формы находится в отдельном компоненте формы
- Хук диалога управляет только открытием/закрытием
- View-компонент содержит форму

**Примеры:** `CreateSegmentDialog`, `CreateBlockDialog`, `AddZonesToSegmentDialog`

### 3. Диалог с триггером

**Характеристики:**

- Имеет отдельный компонент-триггер
- Управление состоянием открытия в родительском компоненте

**Примеры:** `RemoveZoneFromSegmentDialog` (с `RemoveZoneFromSegmentDialogTrigger`)

## Правила именования

1. **Диалоги:** `[Action][Entity]Dialog` (например, `DeleteSegmentDialog`, `CreateBlockDialog`)
2. **Хуки:** `use[Action][Entity]Dialog` (например, `useDeleteSegmentDialog`)
3. **View:** `[Action][Entity]DialogView` (например, `DeleteSegmentDialogView`)
4. **Триггеры:** `[Action][Entity]DialogTrigger` (например, `RemoveZoneFromSegmentDialogTrigger`)
5. **Папки:** `[action]-[entity]-dialog` в kebab-case (например, `delete-segment-dialog`)

## Использование DialogActions

Всегда используйте компонент `DialogActions` вместо ручного создания кнопок:

```typescript
<DialogActions
  onCancel={onCancel}
  onSubmit={onSubmit}
  isSubmitting={isSubmitting}
  submitText="Підтвердити"
  variant="destructive" // для деструктивных действий
  className="justify-end"
/>
```

**Параметры:**

- `onCancel` - обработчик отмены (опционально)
- `onSubmit` - обработчик подтверждения (обязательно)
- `isSubmitting` - состояние загрузки
- `submitText` - текст кнопки подтверждения
- `variant` - вариант кнопки (`"default"` | `"destructive"`)
- `className` - дополнительные классы

## Импорты

Используйте абсолютные пути от директории `src`:

```typescript
import { Dialog } from "@/components/ui/dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import type { EntityDto } from "@/modules/entity/api/types";
```

## Примеры полной структуры

### Пример 1: Диалог удаления

```
delete-entity-dialog/
  ├── DeleteEntityDialog.tsx          # Основной компонент
  ├── DeleteEntityDialogView.tsx      # View-компонент
  ├── useDeleteEntityDialog.ts        # Хук с логикой
  └── index.ts                        # export { DeleteEntityDialog }
```

### Пример 2: Диалог создания с формой

```
create-entity-dialog/
  ├── CreateEntityDialog.tsx          # Основной компонент
  ├── CreateEntityDialogView.tsx      # View-компонент (содержит форму)
  ├── useCreateEntityDialog.ts        # Хук (только управление открытием)
  └── index.ts                        # export { CreateEntityDialog }
```

### Пример 3: Диалог с триггером

```
remove-entity-dialog/
  ├── RemoveEntityDialog.tsx          # Основной компонент
  ├── RemoveEntityDialogView.tsx      # View-компонент
  ├── RemoveEntityDialogTrigger.tsx   # Компонент-триггер
  ├── useRemoveEntityDialog.ts        # Хук с логикой
  └── index.ts                        # export { RemoveEntityDialog, RemoveEntityDialogTrigger }
```

## Чеклист рефакторинга

При рефакторинге существующего диалога проверьте:

- [ ] Логика вынесена в хук (`use[DialogName].ts`)
- [ ] Отрисовка вынесена в View-компонент (`[DialogName]View.tsx`)
- [ ] Основной компонент объединяет хук и View
- [ ] Используется `DialogActions` вместо ручных кнопок
- [ ] Импорты используют абсолютные пути от `@/`
- [ ] Состояние открытия/закрытия управляется через `open` и `onOpenChange`
- [ ] Обработка ошибок находится в хуке
- [ ] Все вычисления (`useMemo`, `useCallback`) в хуке
- [ ] View-компонент не содержит логики
- [ ] Создан `index.ts` с экспортами

## Антипаттерны

❌ **НЕ делайте так:**

```typescript
// Смешивание логики и отрисовки
export function DeleteDialog({ entity }) {
  const mutation = useDeleteMutation();

  return (
    <Dialog>
      <DialogContent>
        <Button onClick={() => mutation.mutate(entity._id)}>Удалить</Button>
      </DialogContent>
    </Dialog>
  );
}
```

✅ **Делайте так:**

```typescript
// Разделение логики и отрисовки
export function DeleteDialog({ entity, open, onOpenChange }) {
  const { isDeleting, handleDelete } = useDeleteDialog({ entity });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteDialogView
        entity={entity}
        isDeleting={isDeleting}
        onDelete={handleDelete}
      />
    </Dialog>
  );
}
```

## Дополнительные ресурсы

- Примеры реализации: `web/src/modules/blocks/components/dialogs/`
- Компонент DialogActions: `web/src/components/shared/dialog-actions/DialogActions.tsx`
- UI компоненты: `web/src/components/ui/dialog/`
