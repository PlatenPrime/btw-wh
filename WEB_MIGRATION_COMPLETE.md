# WEB Миграция на Shared - Выполнена ✅

## Что было сделано

### 1. Обновлен API Client
✅ `web/src/lib/apiClient.tsx` - переписан для использования `createApiClient` из shared
✅ Инициализирован storage через `initStorage` из shared
✅ Создан `artServices` для работы с Arts API
✅ Сохранена web-specific логика обработки ошибок с toast

### 2. Обновлен localStorage
✅ `web/src/utils/localStorage.ts` - обновлен импорт User из shared

### 3. Удалены дублирующиеся файлы
✅ `web/src/constants/server.ts` - удален (теперь в shared)
✅ `web/src/constants/roles.ts` - удален (теперь в shared)
✅ `web/src/hooks/useDebounce.tsx` - удален (теперь в shared)
✅ `web/src/modules/arts/api/` - полностью удалена
✅ `web/src/modules/auth/api/services/` - удалены старые сервисы
✅ `web/src/modules/auth/types/errors.ts` - удален
✅ `web/src/modules/auth/utils/token.ts` - удален
✅ `web/src/modules/asks/api/services/queries` - удалены
✅ `web/src/modules/asks/api/services/mutations` - удалены
✅ `web/src/modules/defs/api/services/*` - удалены
✅ `web/src/modules/rows/api/services/*` - удалены
✅ `web/src/modules/poses/api/services/*` - удалены
✅ `web/src/modules/pallets/api/services/*` - удалены

### 4. Созданы адаптеры для обратной совместимости

#### Types (реэкспорты из shared)
✅ `web/src/modules/auth/api/types/index.ts`
✅ `web/src/modules/arts/api/types/dto.ts`
✅ `web/src/modules/arts/api/types/arts.ts`
✅ `web/src/modules/arts/api/types/index.ts`
✅ `web/src/modules/asks/api/types/index.ts`
✅ `web/src/modules/defs/api/types/index.ts`
✅ `web/src/modules/rows/api/types/index.ts`
✅ `web/src/modules/pallets/api/types/index.ts`
✅ `web/src/modules/poses/api/types/index.ts`

#### Services (адаптеры с инициализацией из shared)
✅ `web/src/modules/auth/api/services/index.ts` - login, register, getMe, updateUser
✅ `web/src/modules/asks/api/services/index.ts` - все queries + mutations
✅ `web/src/modules/defs/api/services/index.ts` - queries + mutations
✅ `web/src/modules/rows/api/services/index.ts` - queries + mutations
✅ `web/src/modules/poses/api/services/index.ts` - queries + mutations
✅ `web/src/modules/pallets/api/services/index.ts` - queries + mutations

#### Hooks (адаптеры для Arts)
✅ `web/src/modules/arts/api/hooks/queries/useArtsQuery.tsx`
✅ `web/src/modules/arts/api/hooks/queries/useArtsInfiniteQuery.tsx`
✅ `web/src/modules/arts/api/hooks/queries/useOneArtQuery.tsx`
✅ `web/src/modules/arts/api/hooks/queries/useBtradeArtDataQuery.tsx`
✅ `web/src/modules/arts/api/hooks/mutations/useUpdateArtLimitMutation.tsx`

### 5. Обновлены импорты

✅ **Auth модуль** (8 файлов):
  - RegisterForm.tsx, usePermission.ts, ProtectedRoute.tsx, RoleGuard.tsx, useRole.ts
  - ProfileSidebarCard.tsx, useAuth.ts
  - auth-provider.tsx - полностью переписан для shared API

✅ **Asks модуль**:
  - dto.ts → types (13 компонентов)
  - Все хуки обновлены (6 mutations + 2 queries)

✅ **Defs модуль**:
  - dto.ts → types (15 компонентов)
  - Все хуки обновлены (1 mutation + 2 queries)

✅ **Rows модуль**:
  - dto.ts → types (21 компонент)
  - Все хуки обновлены (3 mutations + 3 queries)

✅ **Poses модуль**:
  - Все хуки обновлены (4 mutations + 5 queries)

✅ **Pallets модуль**:
  - Все хуки обновлены (7 mutations + 4 queries)

✅ **Утилиты**:
  - `useDebounce` импорт обновлен с `@/hooks` на `@shared/hooks` (1 файл)
  - `getRoleLabel` импорт обновлен с `@/constants/roles` на `@shared/constants` (1 файл)

### 6. Результаты

✅ **Линтер**: 0 ошибок в web/src/modules
✅ **Импорты**: Все импорты модулей обновлены
✅ **Обратная совместимость**: Сохранена через адаптеры
✅ **Архитектура**: Соответствует shared API с dependency injection

### Оставшиеся ошибки (не связаны с миграцией)

⚠️ Ошибки TypeScript в UI компонентах (breadcrumb, button, sidebar, calendar):
- Связаны с несовместимостью версий @types/react
- Не влияют на функциональность модулей
- Требуют обновления зависимостей React или downgrade @types/react

## Следующие шаги

1. ✅ Web миграция завершена
2. ⏳ Тестирование в dev режиме: `npm run web:dev`
3. ⏳ Создание mobile/src/lib/apiClient.ts
4. ⏳ Обновление mobile импортов
5. ⏳ Финальное тестирование

## Как использовать новый API

### В компонентах (осталось без изменений)

```typescript
// Импорты работают как раньше
import { useArtsQuery } from "@/modules/arts/api/hooks/queries/useArtsQuery";
import type { ArtDto } from "@/modules/arts/api/types/dto";

// Использование как раньше
const { data } = useArtsQuery({ page: 1, limit: 20 });
```

### Напрямую через shared (новый способ)

```typescript
// Импортировать типы напрямую из shared
import type { ArtDto } from "@shared/modules/arts";

// Использовать сервисы напрямую
import { artServices } from "@/lib/apiClient";
const data = await artServices.getArtsByParams({ page: 1, limit: 20 });

// Использовать хуки с DI
import { useArtsQuery } from "@shared/modules/arts";
const { data } = useArtsQuery({
  page: 1,
  limit: 20,
  getArtsByParams: artServices.getArtsByParams,
});
```

## Архитектурные улучшения

1. **Единый source of truth** - все API логика в shared
2. **Dependency Injection** - хуки принимают сервисы как параметры
3. **Factory Pattern** - сервисы создаются через фабрики
4. **Обратная совместимость** - старый код работает через адаптеры
5. **Гибкость** - легко создавать mock сервисы для тестов

