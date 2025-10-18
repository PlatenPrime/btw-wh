# @btw-wh/shared

Переиспользуемый пакет с API сервисами, типами и утилитами для web и mobile приложений BTW-WH.

## Структура

```
shared/
├── constants/           # Константы (roles, etc.)
├── hooks/              # React hooks (useDebounce, etc.)
├── lib/
│   ├── apiClient/      # Axios API client
│   ├── config/         # Конфигурация (SERVER_URL)
│   └── storage/        # Storage абстракция
└── modules/
    ├── arts/           # Модуль артикулов
    ├── asks/           # Модуль заявок
    ├── auth/           # Модуль авторизации
    ├── defs/           # Модуль дефицитов
    ├── pallets/        # Модуль паллет
    ├── poses/          # Модуль позиций
    └── rows/           # Модуль рядов
```

## Использование

### Инициализация в web

```typescript
// web/src/lib/apiClient.tsx
import { createApiClient } from "@shared/lib/apiClient";
import { initStorage } from "@shared/lib/storage";
import { SERVER_URL } from "@shared/lib/config";
import { getItem, setItem, removeItem } from "@/utils/localStorage";

// Инициализация storage
initStorage({
  getItem: (key) => getItem(key),
  setItem: (key, value) => setItem(key, value),
  removeItem: (key) => removeItem(key),
  clear: () => localStorage.clear(),
});

// Создание API клиента
export const apiClient = createApiClient({
  baseURL: SERVER_URL,
  timeout: 10000,
  getAuthToken: () => getItem("auth_token"),
  onError: (error) => {
    // Обработка ошибок с toast, редирект, etc.
  },
});

// Создание сервисов
import { createArtServices } from "@shared/modules/arts/api/services/createArtServices";
export const artServices = createArtServices(apiClient);
```

### Использование хуков

```typescript
// В компоненте
import { useArtsQuery } from "@shared/modules/arts/api/hooks/queries/useArtsQuery";
import { artServices } from "@/lib/apiClient";

function ArtsPage() {
  const { data, isLoading } = useArtsQuery({
    page: 1,
    limit: 20,
    getArtsByParams: artServices.getArtsByParams,
  });

  // ...
}
```

## Модули

### Auth

- Типы: User, LoginData, RegisterData
- Сервисы: login, register, getMe, updateUser
- Утилиты: token utils, errors

### Arts

- Типы: ArtDto, ArtsDto, BtradeArtInfoDto
- Сервисы queries: getArtsByParams, getOneArtByArtikul, getBtradeArtDataByArtikul
- Сервисы mutations: updateArtLimitById
- Хуки: useArtsQuery, useArtsInfiniteQuery, useOneArtQuery, useBtradeArtDataQuery, useUpdateArtLimitMutation

### Asks

- Типы: AskDto, AskStatus, GetAsksByDateResponse
- Сервисы queries: getAskById, getAsksByDate
- Сервисы mutations: createAsk, updateAskById, deleteAskById, completeAskById, rejectAskById, updateAskActionsById

### Defs

- Типы: Def, DeficitItem, DefsCalculationStatus
- Сервисы queries: getLatestDefs, getCalculationStatus
- Сервисы mutations: calculateDefs

### Pallets

- Типы: IPallet, PalletShortDto, CreatePalletDto, UpdatePalletDto
- Сервисы queries: getAllPallets, getPalletById, getPalletsByRowId, getEmptyPallets
- Сервисы mutations: createPallet, updatePallet, deletePallet, emptyPalletPoses, deletePalletEmptyPoses, movePalletPoses, deletePalletPoses

### Poses

- Типы: IPos, CreatePosDto, UpdatePosDto, GetPosesByArtikulResponse
- Сервисы queries: getAllPoses, getPosById, getPosesByPalletId, getPosesByRowId, getPosesByArtikul
- Сервисы mutations: createPos, bulkCreatePoses, updatePos, deletePos

### Rows

- Типы: RowDto, CreateRowDto, UpdateRowDto
- Сервисы queries: getRows, getRowById, getRowByTitle
- Сервисы mutations: createRow, updateRow, deleteRow

## Зависимости

- `react` (>=19.0.0) - peer dependency
- `@tanstack/react-query` (^5.85.5)
- `axios` (^1.11.0)
- `zod` (^3.25.75)
