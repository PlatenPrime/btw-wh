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

## Типы диалогов

### 1. Диалог подтверждения

Используется для подтверждения действий (удаление, очистка и т.д.)

**Структура**:
- Заголовок с вопросом
- Описание действия (DialogDescription)
- Кнопки действий (DialogActions) с `variant="destructive"` для опасных действий

**Пример**:
```tsx
<ModalContent className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}>
  <ModalHeader className="flex flex-col gap-2">
    <View className="flex-row items-center justify-between relative">
      <ThemedText type="defaultSemiBold" className="text-lg text-center flex-1">
        Видалити палету "{pallet.title}"?
      </ThemedText>
      <TouchableOpacity onPress={onClose} className="absolute top-0 right-0 p-1" activeOpacity={0.7} style={{ opacity: 0.7 }}>
        <MaterialIcons name="close" size={16} color={textColor} />
      </TouchableOpacity>
    </View>
    <DialogDescription>
      Ви впевнені, що хочете видалити палету "{pallet.title}"? 
      Цю дію неможливо скасувати.
    </DialogDescription>
  </ModalHeader>
  <ModalFooter className="flex flex-col-reverse gap-2">
    <DialogActions
      onCancel={onClose}
      onSubmit={onDelete}
      cancelText="Скасувати"
      submitText="Видалити"
      isSubmitting={isDeleting}
      variant="destructive"
    />
  </ModalFooter>
</ModalContent>
```

### 2. Диалог формы

Используется для ввода данных (создание, редактирование)

**Рекомендуемый подход**: Использовать компонент `FormDialog` для диалогов с формами. Он автоматически:
- Обрабатывает клавиатуру (модальное окно сжимается благодаря `maxHeight`)
- Добавляет скролл при большом количестве инпутов
- Обеспечивает единообразную структуру с заголовком и футером

**Структура с FormDialog**:
- Заголовок в `ModalHeader`
- Форма в `ModalBody` со `ScrollView` внутри
- Кнопки действий в `ModalFooter` (рекомендуется) или внутри формы

**Пример с FormDialog**:
```tsx
import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";

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
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={handleSubmit}
          cancelText="Скасувати"
          submitText="Створити"
          isSubmitting={isSubmitting}
        />
      }
    >
      <CreateRowForm onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}
```

**Структура без FormDialog (для простых форм)**:
- Заголовок
- Форма в ModalBody
- Кнопки действий в форме (не в ModalFooter)

**Пример без FormDialog**:
```tsx
<ModalContent className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}>
  <ModalHeader className="flex flex-col gap-2">
    <View className="flex-row items-center justify-between relative">
      <ThemedText type="defaultSemiBold" className="text-lg text-center flex-1">
        Створити ряд
      </ThemedText>
      <TouchableOpacity onPress={onClose} className="absolute top-0 right-0 p-1" activeOpacity={0.7} style={{ opacity: 0.7 }}>
        <MaterialIcons name="close" size={16} color={textColor} />
      </TouchableOpacity>
    </View>
  </ModalHeader>
  <ModalBody>
    <CreateRowForm onSuccess={onSuccess} onCancel={onClose} />
  </ModalBody>
</ModalContent>
```

### 3. Диалог с выбором

Используется для выбора из списка (перемещение, выбор цели)

**Структура**:
- Заголовок
- Список/форма выбора в ModalBody
- Кнопки действий в форме

## Компонент FormDialog

### Назначение

Удобный компонент для создания диалогов с формами, который автоматически обрабатывает:
- Скролл контента при большом количестве инпутов
- Обработку клавиатуры (модальное окно сжимается благодаря `maxHeight: "90%"`)
- Единообразную структуру с заголовком и футером

### Props

```typescript
interface FormDialogProps {
  visible: boolean;              // Видимость диалога
  onClose: () => void;           // Обработчик закрытия
  title: string;                 // Заголовок диалога
  children: React.ReactNode;     // Контент формы
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
          ├─ ModalBody
          │   └─ ScrollView (keyboardShouldPersistTaps="handled")
          │       └─ Форма с инпутами
          └─ ModalFooter (опционально)
              └─ DialogActions
```

### Обработка клавиатуры

- Модальное окно автоматически сжимается при открытии клавиатуры благодаря `maxHeight: "90%"` на `ModalContent`
- `ScrollView` внутри `ModalBody` обеспечивает скролл контента при большом количестве инпутов
- `keyboardShouldPersistTaps="handled"` позволяет взаимодействовать с элементами формы при открытой клавиатуре
- Контент скроллится внутри `ModalBody`, заголовок и футер остаются видимыми

### ScrollableModalBody

Для ручного использования скроллируемого контента в ModalBody:

```tsx
import { ScrollableModalBody } from "@/components/ui";

<ModalBody>
  <ScrollableModalBody>
    {/* Контент с инпутами */}
  </ScrollableModalBody>
</ModalBody>
```

`ScrollableModalBody` автоматически:
- Оборачивает контент в `ScrollView`
- Устанавливает `keyboardShouldPersistTaps="handled"`
- Показывает вертикальный индикатор скролла

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

- Использовать `gap-3` или `gap-4` для промежутков
- Использовать `ThemedText` и `ThemedView` для поддержки темы
- Использовать `DialogActions` для кнопок действий
- Использовать единую структуру Header/Body/Footer
- Использовать `rounded-lg` для скругления контейнера
- Использовать `p-6` для отступов контейнера
- Использовать `FormDialog` для диалогов с формами (автоматическая обработка клавиатуры через `maxHeight` и скролл контента)
- Использовать `ScrollableModalBody` для скроллируемого контента в обычных Modal

### ❌ Неправильно

- Использовать `space-x` или `space-y` для промежутков
- Хардкодить цвета вместо использования темы
- Создавать кастомные кнопки действий вместо `DialogActions`
- Разные стили для похожих диалогов
- Разные размеры отступов и скруглений
- Игнорировать обработку клавиатуры в диалогах с формами
- Использовать обычный `ModalBody` для форм с большим количеством инпутов без скролла

## Примеры использования

### Полный пример диалога подтверждения

```tsx
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export function DeleteDialogView({
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeleteDialogViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? Colors.light.background : Colors.dark.background;
  const textColor = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#e5e7eb" : "#374151";

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />
      <ModalContent
        className="w-full max-w-md mx-4 rounded-xl p-6 border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <ModalHeader className="mb-4">
          <View className="flex-row items-center justify-between">
            <ThemedText type="defaultSemiBold" className="text-lg">
              Видалити?
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="p-2"
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={24} color={textColor} />
            </TouchableOpacity>
          </View>
        </ModalHeader>
        <ModalBody>
          <ThemedText type="default" className="text-sm mb-6">
            Ви впевнені, що хочете видалити? Цю дію неможливо скасувати.
          </ThemedText>
        </ModalBody>
        <ModalFooter>
          <DialogActions
            onCancel={onClose}
            onSubmit={onDelete}
            cancelText="Скасувати"
            submitText="Видалити"
            isSubmitting={isDeleting}
            variant="destructive"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

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

