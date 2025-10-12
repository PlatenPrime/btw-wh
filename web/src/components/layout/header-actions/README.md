# Header Actions Pattern

Переиспользуемый паттерн для добавления действий в меню хедера страниц.

## Как использовать

### 1. Основной подход

В компоненте контейнера/вью страницы:

```tsx
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useState } from "react";

export function MyContainerView({ data }: Props) {
  // 1. Состояния для диалогов
  const [dialogOpen, setDialogOpen] = useState(false);

  // 2. Хуки для мутаций
  const mutation = useMutation();

  // 3. Обработчики действий
  const handleAction = async () => {
    // логика
  };

  // 4. Регистрация действий в header
  useRegisterHeaderActions([
    {
      id: "unique-action-id",
      label: "Назва дії",
      icon: IconComponent, // з lucide-react
      iconColor: "emerald", // опціонально: emerald, rose, red, default
      variant: "default", // або "destructive"
      onClick: () => setDialogOpen(true),
    },
  ]);

  return (
    <>
      {/* Основной контент */}

      {/* Диалоги внизу */}
      <MyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        // другие пропсы
      />
    </>
  );
}
```

### 2. Доступные цвета иконок

- `emerald` - зеленый (для success/complete действий)
- `rose` - розовый (для reject/cancel действий)
- `red` - красный (для delete/destructive действий)
- `default` - без специального цвета

### 3. Типы действий (variant)

- `default` - обычные действия (будут вверху меню)
- `destructive` - опасные действия (будут внизу меню после разделителя)

### 4. Важно

- Диалоги должны принимать `open` и `onOpenChange` как props
- Триггеры из диалогов нужно убрать
- Действия автоматически отменяют регистрацию при размонтировании
- Для одного действия используй `useRegisterHeaderAction`, для нескольких - `useRegisterHeaderActions`

## Примеры использования

- `web/src/modules/pallets/components/containers/pallet-container/PalletContainerView.tsx`
- `web/src/modules/rows/components/containers/row-container/RowContainerView.tsx`
- `web/src/modules/asks/components/containers/ask-container/AskContainerView.tsx`
