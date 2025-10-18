# BTW-WH Quick Reference Cheatsheet

## 📦 Импорты

### Типы

```typescript
// Arts
import type { ArtDto, ArtsDto, BtradeArtInfoDto } from "@shared/modules/arts";

// Asks
import type {
  AskDto,
  AskStatus,
  GetAsksByDateResponse,
} from "@shared/modules/asks";

// Poses
import type {
  IPos,
  CreatePosDto,
  GetPosesByArtikulResponse,
} from "@shared/modules/poses";

// Pallets
import type { IPallet, PalletShortDto } from "@shared/modules/pallets";

// Rows
import type { RowDto, CreateRowDto } from "@shared/modules/rows";

// Defs
import type { Def, DeficitItem } from "@shared/modules/defs";

// Auth
import type { User, RoleType, RegisterData } from "@shared/modules/auth";
```

### Константы

```typescript
import { RoleType, hasRoleAccess, getRoleLabel } from "@shared/constants";
```

### Хуки

```typescript
import { useDebounce } from "@shared/hooks";
import { useArtsQuery, useArtsInfiniteQuery } from "@shared/modules/arts";
```

### Сервисы

**Web:**

```typescript
import { artsServices } from "@/lib/apiClient";
```

**Mobile:**

```typescript
import { artsServices } from "@/lib/apiClient";
```

## 🔧 API Сервисы

### Arts

```typescript
import { artsServices } from "@/lib/apiClient";

// Список
const data = await artsServices.getArtsByParams({
  page: 1,
  limit: 20,
  search: "",
});

// Один
const art = await artsServices.getOneArtByArtikul("ART123");

// Btrade
const btrade = await artsServices.getBtradeArtDataByArtikul("ART123");

// Update limit
const updated = await artsServices.updateArtLimitById("id", { limit: 100 });
```

### Asks

```typescript
import { asksServices } from "@/lib/apiClient";

// По дате
const asks = await asksServices.getAsksByDate({ date: "2024-01-15" });

// По ID
const ask = await asksServices.getAskById("askId");

// Создать
await asksServices.createAsk({ artikul: "ART123", askerId: userId });

// Виконати
await asksServices.completeAskById("askId", solverId);

// Відхилити
await asksServices.rejectAskById("askId", solverId);

// Удалить
await asksServices.deleteAskById("askId");
```

### Poses

```typescript
import { posesServices } from "@/lib/apiClient";

// По паллете
const poses = await posesServices.getPosesByPalletId(palletId);

// По артикулу
const byArt = await posesServices.getPosesByArtikul("ART123");

// Создать
await posesServices.createPos({
  palletId,
  rowId,
  artikul: "ART123",
  quant: 10,
  boxes: 2,
  sklad: "pogrebi",
});

// Обновить
await posesServices.updatePos(posId, { quant: 15 });

// Удалить
await posesServices.deletePos(posId);
```

### Pallets

```typescript
import { palletsServices } from "@/lib/apiClient";

// Список
const pallets = await palletsServices.getAllPallets();

// По ряду
const palletsByRow = await palletsServices.getPalletsByRowId(rowId);

// Создать
await palletsServices.createPallet({
  title: "A-01",
  rowData: { _id: rowId, title: "Row A" },
  isDef: false,
});

// Переместить позиции
await palletsServices.movePalletPoses(sourceId, targetId);

// Очистить
await palletsServices.deletePalletPoses(palletId);
```

### Rows

```typescript
import { rowsServices } from "@/lib/apiClient";

// Список
const rows = await rowsServices.getRows({ signal });

// По ID
const row = await rowsServices.getRowById(rowId);

// Создать
await rowsServices.createRow({ title: "Row A" });

// Обновить
await rowsServices.updateRow(rowId, { title: "Row B" });
```

### Defs

```typescript
import { defsServices } from "@/lib/apiClient";

// Последние
const defs = await defsServices.getLatestDefs();

// Статус расчета
const status = await defsServices.getCalculationStatus();

// Запустить расчет
await defsServices.calculateDefs();
```

## 🪝 React Query Hooks

### Queries (Web)

```typescript
import { useArtsQuery, useOneArtQuery } from "@/modules/arts/api/hooks/queries";

// Адаптеры - работают как раньше
const { data } = useArtsQuery({ page: 1, limit: 20 });
const { data } = useOneArtQuery("ART123");
```

### Queries (Mobile или Web с DI)

```typescript
import { useArtsQuery } from "@shared/modules/arts";
import { artsServices } from "@/lib/apiClient";

const { data } = useArtsQuery({
  page: 1,
  limit: 20,
  getArtsByParams: artsServices.getArtsByParams, // DI
});
```

### Mutations (стандартные)

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { asksServices } from "@/lib/apiClient";

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (data) => asksServices.createAsk(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["asks"] });
  },
});

await mutation.mutateAsync(data);
```

## 🎭 Роли

```typescript
import { RoleType, hasRoleAccess } from '@shared/constants';
import { useAuth } from '@/providers/AuthProvider'; // или '@/modules/auth/api/hooks/useAuth' для web

const { user, hasRole, hasAnyRole } = useAuth();

// Проверка
hasRole(RoleType.ADMIN)  // true для ADMIN и PRIME
hasRole(RoleType.USER)   // true для всех

hasAnyRole([RoleType.ADMIN, RoleType.PRIME])  // только админы

// Условный рендеринг
{hasRole(RoleType.ADMIN) && <AdminButton />}
```

## 🗺️ Навигация

### Web (React Router)

```typescript
import { useNavigate } from "react-router";

const navigate = useNavigate();

navigate("/arts/dashboard");
navigate("/arts/ART123");
navigate("/wh/rows/Row-A");
```

### Mobile (React Navigation)

```typescript
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();

navigation.navigate("ArtsList");
navigation.navigate("ArtDetail", { artikul: "ART123" });
navigation.goBack();
```

## 🔑 Query Keys

```typescript
// Invalidation после мутаций
queryClient.invalidateQueries({ queryKey: ["arts"] });
queryClient.invalidateQueries({ queryKey: ["art", { artikul }] });
queryClient.invalidateQueries({ queryKey: ["asks"] });
queryClient.invalidateQueries({ queryKey: ["poses"] });
queryClient.invalidateQueries({ queryKey: ["pallets"] });
queryClient.invalidateQueries({ queryKey: ["rows"] });
queryClient.invalidateQueries({ queryKey: ["defs"] });
```

## 💾 Storage

### Web

```typescript
import { getItem, setItem, removeItem } from "@/utils/localStorage";

const token = getItem("auth_token");
setItem("auth_token", "token123");
removeItem("auth_token");
```

### Mobile

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = await AsyncStorage.getItem("auth_token");
await AsyncStorage.setItem("auth_token", "token123");
await AsyncStorage.removeItem("auth_token");
```

## 🐛 Debounce

```typescript
import { useDebounce } from '@shared/hooks';
import { useState } from 'react';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

// Используй debouncedSearch в запросах
const { data } = useArtsQuery({
  search: debouncedSearch, // не search!
  ...
});
```

## 🎨 Типичные паттерны

### Infinite Scroll (Mobile)

```typescript
import { useArtsInfiniteQuery } from '@shared/modules/arts';

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArtsInfiniteQuery({
  limit: 20,
  search,
  getArtsByParams: artsServices.getArtsByParams,
});

const items = data?.pages.flatMap(page => page.data) ?? [];

// В FlatList
<FlatList
  data={items}
  onEndReached={() => hasNextPage && fetchNextPage()}
  ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
/>
```

### Пагинация (Web)

```typescript
import { useArtsQuery } from '@/modules/arts/api/hooks/queries';

const [page, setPage] = useState(1);

const { data } = useArtsQuery({ page, limit: 20 });

// Навигация
<button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
  Назад
</button>
<button onClick={() => setPage(p => p + 1)} disabled={!data || page >= data.totalPages}>
  Вперед
</button>
```

### Поиск с debounce

```typescript
import { useDebounce } from "@shared/hooks";

const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 500);

const { data } = useQuery({
  queryKey: ["items", debouncedSearch],
  queryFn: () => service.search(debouncedSearch),
});
```

### Мутация с invalidation

```typescript
const mutation = useMutation({
  mutationFn: createService,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["list"] });
    // Mobile
    Alert.alert("Успіх", "Створено");
    // Web
    toast({ title: "Успіх", description: "Створено" });
  },
  onError: (error) => {
    // Mobile
    Alert.alert("Помилка", error.message);
    // Web
    toast({
      variant: "destructive",
      title: "Помилка",
      description: error.message,
    });
  },
});
```

## 🗂️ Структура файлов

### Shared

```
shared/
├── lib/                 # createApiClient, initStorage, SERVER_URL
├── constants/           # RoleType, utils
├── hooks/              # useDebounce
└── modules/
    ├── auth/           # User, login, register
    ├── arts/           # ArtDto, services, hooks
    ├── asks/           # AskDto, services
    ├── defs/           # DeficitItem, services
    ├── pallets/        # IPallet, services
    ├── poses/          # IPos, services
    └── rows/           # RowDto, services
```

### Web

```
web/src/
├── lib/apiClient.tsx          # Web API client (storage, toast)
├── modules/
│   └── */api/                 # Адаптеры для shared
│       ├── types/             # Реэкспорты
│       ├── services/          # Адаптеры сервисов
│       └── hooks/             # Адаптеры хуков (Arts)
└── ...
```

### Mobile

```
mobile/src/
├── lib/apiClient.ts           # ⏳ Создать
├── providers/                 # ⏳ Создать
├── navigation/                # ⏳ Обновить
├── screens/                   # ⏳ Создать
└── components/                # ⏳ Создать
```

## 📚 Документация

| Файл                                 | Описание                      |
| ------------------------------------ | ----------------------------- |
| `shared/README.md`                   | Как использовать shared пакет |
| `mobile/README.md`                   | Обзор mobile приложения       |
| `mobile/QUICK_START.md`              | Быстрый старт mobile          |
| `mobile/MOBILE_DEVELOPMENT_GUIDE.md` | Полное руководство mobile     |
| `mobile/API_REFERENCE.md`            | Справочник API                |
| `WEB_MIGRATION_COMPLETE.md`          | Детали web миграции           |
| `MIGRATION_STATUS.md`                | Общий статус                  |
| `MIGRATION_COMPLETE.md`              | Итоговая сводка               |
| `CHEATSHEET.md`                      | Этот файл                     |

## 🚀 Команды

```bash
# Monorepo
npm install                    # Установка всех зависимостей

# Web
npm run web:dev                # Dev сервер (Vite)
npm run web:build              # Production build

# Mobile
npm run mobile:start           # Expo dev сервер
npm run mobile:android         # Android build
npm run mobile:ios             # iOS build

# Shared
cd shared && npm install       # Установка зависимостей shared
```

## 🎯 Быстрые ссылки

- Web роутер: `web/src/router.tsx`
- Web меню: `web/src/components/layout/sidebar/data/app-sidebar-data.tsx`
- Web модули: `web/src/modules/`
- Shared API: `shared/modules/`
- Mobile guide: `mobile/MOBILE_DEVELOPMENT_GUIDE.md`

## ⚡ Быстрые фиксы

### Storage not initialized

```typescript
// Добавь первым импортом в App
import "./src/lib/apiClient";
```

### TypeScript ошибки shared

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["../shared/*"]
    }
  }
}
```

### Metro не видит shared (Mobile)

```javascript
// metro.config.js
config.watchFolders = [workspaceRoot];
config.resolver.extraNodeModules = {
  "@shared": path.resolve(workspaceRoot, "shared"),
};
```

### Vite не видит shared (Web)

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@shared': path.resolve(__dirname, '../shared'),
  }
}
```

## 📋 Чек-листы

### Web разработка

- [x] Импорты из `@shared/modules/*`
- [x] Сервисы через `@/lib/apiClient`
- [x] Хуки из `@/modules/*/api/hooks` (адаптеры)
- [x] Types из `@/modules/*/api/types` (реэкспорты)

### Mobile разработка

- [ ] Создать `lib/apiClient.ts`
- [ ] Создать провайдеры
- [ ] Обновить навигацию
- [ ] Создать экраны
- [ ] Импорты из `@shared/modules/*`
- [ ] Сервисы через `@/lib/apiClient`

---

**Версия:** 1.0.0  
**Дата:** October 2025  
**Статус:** ✅ Web Ready | ⏳ Mobile In Progress
