# Руководство по дизайну модальных окон (диалогов)

## Общие принципы

Модальные окна в мобильной части должны визуально соответствовать веб-версии проекта, обеспечивая единообразный пользовательский опыт.

## Структура модального окна

### Базовая структура

```
Modal (isOpen, onClose)
  └─ ModalBackdrop (rgba(0, 0, 0, 0.5))
  └─ ModalContent (rounded-lg, p-6, border, shadow-lg, gap-4, max-w-md, mx-4)
      ├─ ModalHeader (flex flex-col gap-2)
      │   └─ View (flex-row, justify-between, items-center, relative)
      │       ├─ ThemedText (type="defaultSemiBold", text-lg, text-center, flex-1) - заголовок
      │       └─ TouchableOpacity (absolute top-0 right-0, кнопка закрытия 16px)
      │   └─ DialogDescription (опционально)
      ├─ ModalBody
      │   └─ Контент (форма/текст/список)
      └─ ModalFooter (flex flex-col-reverse gap-2, опционально)
          └─ DialogActions (кнопки действий)
```

## Стилистические принципы

### Контейнер (ModalContent)

- **Скругление**: `rounded-lg` (8px) - соответствует веб-версии
- **Отступы**: `p-6` (24px со всех сторон)
- **Граница**: `border` с цветом из темы (`border-outline-100`)
- **Тень**: `shadow-lg` (через Platform.select для iOS/Android)
- **Gap между элементами**: `gap-4` (16px)
- **Максимальная ширина**: `max-w-md` (448px)
- **Отступы по бокам**: `mx-4` (16px от краев экрана)
- **Фон**: `bg-background-0` (из темы)

### Overlay (ModalBackdrop)

- **Цвет**: `rgba(0, 0, 0, 0.5)` - 50% прозрачности черного
- **Позиционирование**: `flex-1 justify-center items-center`

### Заголовок (ModalHeader)

- **Структура**: `flex flex-col gap-2` (вертикальная колонка с промежутком 8px)
- **Тип текста**: `ThemedText` с `type="defaultSemiBold"`
- **Размер**: `text-lg` (18px)
- **Центрирование**: `text-center` (по умолчанию, как в веб-версии)
- **Расположение заголовка и кнопки**: `flex-row justify-between items-center relative`

### Кнопка закрытия

- **Иконка**: `MaterialIcons` с именем `"close"`
- **Размер иконки**: `16px` (`size-4`) - соответствует веб-версии
- **Позиционирование**: `absolute top-0 right-0` (внутри relative контейнера)
- **Отступы**: `p-1` (4px)
- **Opacity**: `0.7` (постоянная, не только при нажатии)
- **Opacity при нажатии**: `activeOpacity={0.7}`
- **Цвет**: из темы через `textColor` prop

### Тело модального окна (ModalBody)

- **Отступы**: определяются контентом
- **Gap между элементами**: используй `gap-4` (НЕ `space-x`/`space-y`)

### Футер (ModalFooter)

- **Структура**: `flex flex-col-reverse gap-2` (кнопки в колонку, обратный порядок)
- Используется для размещения кнопок действий
- Компонент `DialogActions` размещается здесь

## Компонент DialogActions

### Назначение

Единый компонент для размещения кнопок действий в модальных окнах. Обеспечивает единообразие стилей и поведения.

### Props

```typescript
interface DialogActionsProps {
  onCancel?: () => void;           // Обработчик отмены
  onSubmit: () => void;             // Обработчик подтверждения
  cancelText?: string;              // Текст кнопки отмены (по умолчанию "Скасувати")
  submitText?: string;              // Текст кнопки подтверждения (по умолчанию "Підтвердити")
  isSubmitting?: boolean;           // Состояние загрузки
  isDisabled?: boolean;             // Отключение кнопки
  variant?: "default" | "destructive"; // Вариант кнопки (default/info или destructive/error)
  className?: string;               // Дополнительные классы
}
```

### Стили

- **Контейнер**: `flex-row gap-2` (8px промежуток, как в веб-версии)
- **Кнопки**: `flex-1` (равная ширина), `py-3` (высота), `rounded-lg`
- **Кнопка отмены**: `border border-outline-100 bg-background-0`
- **Кнопка подтверждения**: 
  - `default`: `bg-info-500` или `bg-violet-500`
  - `destructive`: `bg-error-500` или `#ef4444` / `#dc2626`

## Стандартный подход: использование FormDialog

**ВАЖНО**: Все диалоги в мобильной части должны использовать компонент `FormDialog`. Это стандартный подход, который обеспечивает:
- Единообразную структуру всех диалогов
- Автоматическую обработку клавиатуры
- Автоматический скролл контента
- Управление темами (светлая/темная)
- Упрощенную поддержку и обновление

## Типы диалогов

### 1. Диалог подтверждения

Используется для подтверждения действий (удаление, очистка и т.д.)

**Структура с FormDialog**:
- Заголовок с вопросом в `title` prop
- Описание действия (DialogDescription) в `children`
- Кнопки действий (DialogActions) в `footer` prop с `variant="destructive"` для опасных действий

**Пример**:
```tsx
import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog-description/DialogDescription";

export function DeletePalletDialogView({
  pallet,
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeletePalletDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Видалити палету "${pallet.title}"?`}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Видалити"
          isSubmitting={isDeleting}
          variant="destructive"
        />
      }
    >
      <DialogDescription>
        Ви впевнені, що хочете видалити палету "{pallet.title}"? 
        Цю дію неможливо скасувати, вона також призведе до видалення всіх
        пов'язаних позицій.
      </DialogDescription>
    </FormDialog>
  );
}
```

### 2. Диалог формы

Используется для ввода данных (создание, редактирование)

**Структура с FormDialog**:
- Заголовок в `title` prop
- Форма в `children` (автоматически обернута в ScrollView)
- Кнопки действий в `footer` prop (опционально, если форма сама управляет кнопками)

**Пример с footer**:
```tsx
import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";

export function CreateRowDialogView({
  visible,
  onClose,
  onSuccess,
}: CreateRowDialogViewProps) {
  const { handleSubmit } = form;

  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Створити ряд"
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={handleSubmit(onSubmit)}
          cancelText="Скасувати"
          submitText="Створити"
          isSubmitting={isSubmitting}
          variant="create"
        />
      }
    >
      <CreateRowForm onSuccess={onSuccess} onCancel={onClose} hideActions={true} />
    </FormDialog>
  );
}
```

**Пример без footer (кнопки в форме)**:
```tsx
import { FormDialog } from "@/components/shared/form-dialog";

export function CreateRowDialogView({
  visible,
  onClose,
  onSuccess,
}: CreateRowDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Створити ряд"
    >
      <CreateRowForm onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}
```

### 3. Диалог с кастомным футером

Используется когда нужны кастомные кнопки или дополнительная логика в футере

**Структура с FormDialog**:
- Заголовок в `title` prop
- Контент в `children`
- Кастомный футер в `footer` prop

**Пример**:
```tsx
import { FormDialog } from "@/components/shared/form-dialog";
import { Button, Text } from "@/components/ui";
import { View, ActivityIndicator } from "react-native";

export function CompleteAskDialogView({
  artikul,
  isCompleting,
  onComplete,
  onCancel,
  visible,
}: CompleteAskDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onCancel}
      title={`Виконати запит "${artikul}"?`}
      footer={
        <View className="flex-row gap-2">
          <Button onPress={onCancel} disabled={isCompleting} variant="outline" className="flex-1">
            <Text className="font-semibold">Скасувати</Text>
          </Button>
          <Button onPress={onComplete} disabled={isCompleting} variant="confirm" className="flex-1">
            {isCompleting ? (
              <ActivityIndicator color={staticColors.white} />
            ) : (
              <Text className="text-white font-semibold">Виконати</Text>
            )}
          </Button>
        </View>
      }
    >
      <ThemedText type="default" className="text-sm opacity-70">
        Ви впевнені, що хочете виконати запит "{artikul}"? Ця дія змінить статус
        запиту на "виконано".
      </ThemedText>
    </FormDialog>
  );
}
```

## Компонент FormDialog

### Назначение

**FormDialog** - стандартный компонент для создания всех диалогов в мобильной части. Он автоматически обрабатывает:
- Скролл контента при большом количестве инпутов
- Обработку клавиатуры (модальное окно сжимается благодаря `maxHeight: "90%"`)
- Единообразную структуру с заголовком и футером
- Управление темами (светлая/темная) - не нужно передавать `bgColor`, `textColor`, `borderColor`

### Props

```typescript
interface FormDialogProps {
  visible: boolean;              // Видимость диалога
  onClose: () => void;           // Обработчик закрытия
  title: string;                 // Заголовок диалога
  children: React.ReactNode;     // Контент диалога (форма, текст, список и т.д.)
  footer?: React.ReactNode;      // Футер с кнопками действий (опционально)
}
```

### Структура

```
FormDialog
  └─ Modal
      └─ ModalBackdrop
      └─ ModalContent (maxHeight: 90%)
          ├─ ModalHeader
          │   ├─ Заголовок (title)
          │   └─ Кнопка закрытия
          ├─ ModalBody
          │   └─ ScrollView (keyboardShouldPersistTaps="handled")
          │       └─ children (контент диалога)
          └─ ModalFooter (опционально, если передан footer)
              └─ footer
```

### Обработка клавиатуры

- Модальное окно автоматически сжимается при открытии клавиатуры благодаря `maxHeight: "90%"` на `ModalContent`
- `ScrollView` внутри `ModalBody` обеспечивает скролл контента при большом количестве инпутов
- `keyboardShouldPersistTaps="handled"` позволяет взаимодействовать с элементами формы при открытой клавиатуре
- Контент скроллится внутри `ModalBody`, заголовок и футер остаются видимыми

### Преимущества использования FormDialog

1. **Единообразие**: Все диалоги выглядят одинаково
2. **Меньше кода**: Не нужно дублировать структуру Modal
3. **Автоматическая обработка тем**: Не нужно передавать цвета вручную
4. **Упрощенная поддержка**: Изменения в одном месте применяются ко всем диалогам
5. **Автоматическая обработка клавиатуры**: Не нужно думать о скролле и размерах

## Анимации

- **Overlay**: плавное появление/исчезновение (fade)
- **Контент**: плавное появление с небольшим масштабированием (zoom-in/out)
- Используется нативный `animationType="fade"` для RNModal или встроенные анимации Gluestack Modal

## Темная/светлая тема

Все компоненты должны автоматически поддерживать обе темы через:
- `ThemedText` и `ThemedView` для автоматической поддержки темы
- Цвета из темы через `useTheme()` или `useColorScheme()`
- Использование темизированных цветов из `constants/theme.ts`

## Правила использования

### ✅ Правильно

- **ВСЕГДА использовать `FormDialog`** для создания диалогов
- Использовать `gap-3` или `gap-4` для промежутков
- Использовать `ThemedText` и `ThemedView` для поддержки темы
- Использовать `DialogActions` для стандартных кнопок действий
- Использовать `DialogDescription` для описаний в диалогах подтверждения
- Передавать заголовок через `title` prop, а не создавать ModalHeader вручную
- Использовать `footer` prop для кнопок действий
- Не передавать `bgColor`, `textColor`, `borderColor` - FormDialog управляет темами автоматически

### ❌ Неправильно

- Создавать диалоги без использования `FormDialog` (дублирование структуры Modal)
- Использовать `space-x` или `space-y` для промежутков
- Хардкодить цвета вместо использования темы
- Передавать `bgColor`, `textColor`, `borderColor` в View компоненты диалогов
- Создавать кастомные кнопки действий вместо `DialogActions` (кроме случаев, когда нужна кастомная логика)
- Разные стили для похожих диалогов
- Разные размеры отступов и скруглений
- Игнорировать обработку клавиатуры в диалогах с формами
- Использовать обычный `ModalBody` для форм с большим количеством инпутов без скролла

## Примеры использования

### Полный пример диалога подтверждения

```tsx
import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog-description/DialogDescription";

export function DeletePalletDialogView({
  pallet,
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeletePalletDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Видалити палету "${pallet.title}"?`}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Видалити"
          isSubmitting={isDeleting}
          variant="destructive"
        />
      }
    >
      <DialogDescription>
        Ви впевнені, що хочете видалити палету "{pallet.title}"? 
        Цю дію неможливо скасувати, вона також призведе до видалення всіх
        пов'язаних позицій.
      </DialogDescription>
    </FormDialog>
  );
}
```

### Полный пример диалога формы с react-hook-form

```tsx
import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { CreatePalletFormView } from "@/modules/pallets/components/forms/create-pallet-form/CreatePalletFormView";
import type { UseFormReturn } from "react-hook-form";

export function CreatePalletDialogView({
  visible,
  onClose,
  form,
  onSubmit,
  isSubmitting,
}: CreatePalletDialogViewProps) {
  const { handleSubmit } = form;

  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Додати палету"
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={handleSubmit(onSubmit)}
          cancelText="Скасувати"
          submitText="Додати"
          isSubmitting={isSubmitting}
          variant="create"
        />
      }
    >
      <CreatePalletFormView
        form={form}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
        hideActions={true}
      />
    </FormDialog>
  );
}
```

## Миграция существующих диалогов

Если у вас есть старый диалог, который использует Modal напрямую, выполните следующие шаги:

1. **Удалите импорты**: `Modal`, `ModalBackdrop`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`, `Platform`, `useThemeColors`
2. **Добавьте импорт**: `FormDialog` из `@/components/shared/form-dialog`
3. **Удалите props**: `bgColor`, `textColor`, `borderColor` из интерфейса
4. **Замените структуру**: Вся структура Modal заменяется на `FormDialog` с `title` и `footer` props
5. **Обновите контейнер**: Уберите передачу `bgColor`, `textColor`, `borderColor` из контейнера (Dialog.tsx)

## Соответствие веб-версии

Все принципы дизайна модальных окон должны точно соответствовать веб-версии:

- **Веб**: `rounded-lg` → **Мобильная**: `rounded-lg` (8px, одинаково)
- **Веб**: `p-6` → **Мобильная**: `p-6` (24px, одинаково)
- **Веб**: `shadow-lg` → **Мобильная**: `shadow-lg` (через Platform.select)
- **Веб**: `gap-4` → **Мобильная**: `gap-4` (16px, одинаково)
- **Веб**: `max-w-lg` → **Мобильная**: `max-w-md` (адаптация для мобильных)
- **Веб**: `bg-black/50` → **Мобильная**: `rgba(0, 0, 0, 0.5)` (одинаково)
- **Веб**: `size-4` (16px) кнопка закрытия → **Мобильная**: `16px` (одинаково)
- **Веб**: `gap-2` в DialogActions → **Мобильная**: `gap-2` (одинаково)
- **Веб**: `flex flex-col gap-2` в DialogHeader → **Мобильная**: `flex flex-col gap-2` (одинаково)
- **Веб**: `text-center` в DialogTitle → **Мобильная**: `text-center` (одинаково)

