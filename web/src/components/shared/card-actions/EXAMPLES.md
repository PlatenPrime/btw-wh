# Примеры использования CardActionsMenu

## Вертикальные точки (по умолчанию)

```tsx
<CardActionsMenu
  actions={actions}
  orientation="vertical" // ⋮
  size="sm"
/>
```

## Горизонтальные точки

```tsx
<CardActionsMenu
  actions={actions}
  orientation="horizontal" // ⋯
  size="md"
/>
```

## Полный пример: Карточка товара

```tsx
import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";
import { Edit, Trash, Copy, Archive } from "lucide-react";
import { useState } from "react";

interface ProductCardActionsProps {
  product: Product;
  onSuccess?: () => void;
}

export function ProductCardActions({
  product,
  onSuccess,
}: ProductCardActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
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
      id: "duplicate",
      label: "Дублювати",
      icon: Copy,
      variant: "default",
      onClick: () => setIsDuplicateOpen(true),
    },
    {
      id: "archive",
      label: "Архівувати",
      icon: Archive,
      variant: "default",
      onClick: () => setIsArchiveOpen(true),
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
      <CardActionsMenu
        actions={actions}
        orientation="vertical"
        size="sm"
        align="end"
      />

      <EditProductDialog
        product={product}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={onSuccess}
      />

      <DuplicateProductDialog
        product={product}
        open={isDuplicateOpen}
        onOpenChange={setIsDuplicateOpen}
        onSuccess={onSuccess}
      />

      <ArchiveProductDialog
        product={product}
        open={isArchiveOpen}
        onOpenChange={setIsArchiveOpen}
        onSuccess={onSuccess}
      />

      <DeleteProductDialog
        product={product}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={onSuccess}
      />
    </>
  );
}
```

## Пример с цветными иконками

```tsx
const actions: CardAction[] = [
  {
    id: "approve",
    label: "Підтвердити",
    icon: Check,
    iconColor: "emerald", // 🟢
    variant: "default",
    onClick: () => handleApprove(),
  },
  {
    id: "pending",
    label: "На розгляді",
    icon: Clock,
    iconColor: "default", // ⚪
    variant: "default",
    onClick: () => handlePending(),
  },
  {
    id: "reject",
    label: "Відхилити",
    icon: X,
    iconColor: "rose", // 🔴
    variant: "destructive",
    onClick: () => handleReject(),
  },
];
```

## Компактная карточка (маленький размер)

```tsx
<Card className="p-2">
  <div className="flex items-center justify-between">
    <span>{item.name}</span>

    <CardActionsMenu
      actions={actions}
      orientation="vertical"
      size="sm" // Маленькая кнопка 6x6
      align="end"
    />
  </div>
</Card>
```

## Большая карточка (средний размер)

```tsx
<Card className="p-4">
  <CardHeader>
    <div className="flex items-start justify-between">
      <CardTitle>{item.title}</CardTitle>

      <CardActionsMenu
        actions={actions}
        orientation="horizontal"
        size="md" // Средняя кнопка 8x8
        align="end"
      />
    </div>
  </CardHeader>

  <CardContent>{/* Контент карточки */}</CardContent>
</Card>
```

## Кастомный trigger

```tsx
<CardActionsMenu
  actions={actions}
  trigger={
    <Button variant="outline" size="sm">
      <Settings className="mr-2 h-4 w-4" />
      Налаштування
    </Button>
  }
/>
```

## Выравнивание меню

```tsx
// Справа (по умолчанию)
<CardActionsMenu actions={actions} align="end" />

// По центру
<CardActionsMenu actions={actions} align="center" />

// Слева
<CardActionsMenu actions={actions} align="start" />
```

## Только default действия

```tsx
const actions: CardAction[] = [
  {
    id: "view",
    label: "Переглянути",
    icon: Eye,
    variant: "default",
    onClick: () => handleView(),
  },
  {
    id: "edit",
    label: "Редагувати",
    icon: Edit,
    variant: "default",
    onClick: () => handleEdit(),
  },
];

// Разделителя не будет, так как все действия default
```

## Только destructive действия

```tsx
const actions: CardAction[] = [
  {
    id: "delete",
    label: "Видалити",
    icon: Trash,
    variant: "destructive",
    onClick: () => handleDelete(),
  },
  {
    id: "clear",
    label: "Очистити",
    icon: X,
    variant: "destructive",
    onClick: () => handleClear(),
  },
];

// Разделителя не будет, так как все действия destructive
```

## Одно действие

```tsx
const actions: CardAction[] = [
  {
    id: "delete",
    label: "Видалити",
    icon: Trash,
    variant: "destructive",
    onClick: () => handleDelete(),
  },
];

// Работает, но возможно лучше использовать простую кнопку
```

## Динамические действия

```tsx
const actions: CardAction[] = [
  // Всегда показываем редактирование
  {
    id: "edit",
    label: "Редагувати",
    icon: Edit,
    variant: "default",
    onClick: () => setIsEditOpen(true),
  },

  // Условно показываем архивирование
  ...(item.status !== "archived"
    ? [
        {
          id: "archive",
          label: "Архівувати",
          icon: Archive,
          variant: "default" as const,
          onClick: () => setIsArchiveOpen(true),
        },
      ]
    : []),

  // Всегда показываем удаление
  {
    id: "delete",
    label: "Видалити",
    icon: Trash,
    variant: "destructive",
    onClick: () => setIsDeleteOpen(true),
  },
];
```

## Интеграция в Grid Layout

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} className="relative">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle>{item.title}</CardTitle>
        <CardActionsMenu
          actions={getActions(item)}
          orientation="vertical"
          size="sm"
        />
      </CardHeader>
      <CardContent>{/* Контент */}</CardContent>
    </Card>
  ))}
</div>
```
