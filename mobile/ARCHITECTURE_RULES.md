# Правила архитектуры проекта

## Компоненты View

**Важно:** Компоненты с суффиксом `View` (например, `PalletInfoView`, `PalletSortControlsView`) должны быть **чистыми презентационными компонентами** без логики.

### Что НЕ должно быть в View компонентах:

- ❌ Хуки React (`useState`, `useEffect`, `useColorScheme`, `useQuery` и т.д.)
- ❌ Вычисления и бизнес-логика
- ❌ Обращения к API
- ❌ Условная логика (кроме простых условных рендеров)
- ❌ Обработка данных (`.map()`, `.filter()`, `.find()` и т.д.)

### Что ДОЛЖНО быть в View компонентах:

- ✅ Только рендеринг UI
- ✅ Получение данных через props
- ✅ Вызов колбэков через props
- ✅ Простые условные рендеры (`{condition && <Component />}`)

### Пример правильной структуры:

```typescript
// ❌ НЕПРАВИЛЬНО - логика в View
export function PalletInfoView({ pallet }: { pallet: IPallet }) {
  const colorScheme = useColorScheme(); // ❌ хук
  const total = pallet.poses.reduce(...); // ❌ вычисление
  return <View>...</View>;
}

// ✅ ПРАВИЛЬНО - логика в основном компоненте
export function PalletInfo({ pallet }: { pallet: IPallet }) {
  const colorScheme = useColorScheme(); // ✅ хук здесь
  const total = pallet.poses.reduce(...); // ✅ вычисление здесь
  return <PalletInfoView total={total} iconColor={...} />;
}

export function PalletInfoView({ total, iconColor }: { total: number; iconColor: string }) {
  return <View>...</View>; // ✅ только рендеринг
}
```

### Преимущества такого подхода:

1. **Тестируемость** - View компоненты легко тестировать, так как они чистые функции
2. **Переиспользование** - View компоненты можно использовать в разных контекстах
3. **Разделение ответственности** - логика отделена от представления
4. **Производительность** - легче оптимизировать и мемоизировать

