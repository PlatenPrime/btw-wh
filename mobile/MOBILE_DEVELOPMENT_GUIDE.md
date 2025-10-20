# BTW-WH Mobile - Руководство по разработке

## Введение

Это мобильное приложение на Expo React Native, которое является копией web версии BTW-WH. Приложение использует общий `@btw-wh/shared` пакет с API сервисами, типами и бизнес-логикой.

## Архитектура приложения

### Технологический стек

- **Expo** - платформа для React Native
- **React Native** - UI фреймворк
- **React Navigation** - навигация
- **@tanstack/react-query** - управление серверным состоянием
- **React Hook Form** - формы и валидация
- **Zod** - схемы валидации
- **@btw-wh/shared** - общие API, типы и утилиты
- **AsyncStorage** - локальное хранилище
- **NativeWind** - Tailwind CSS для React Native

### Структура навигации (по аналогии с Web)

```
RootNavigator
├── AuthStack (неавторизованные)
│   ├── Login
│   └── Register
└── MainTabs (авторизованные)
    ├── Arts Tab
    │   ├── ArtsList
    │   ├── ArtDetail
    │   ├── ArtsUpdate
    │   └── ArtsUtils
    ├── Warehouse Tab
    │   ├── Rows List
    │   ├── Row Detail
    │   ├── Pallet Detail
    │   ├── Stocks
    │   └── Zones
    ├── Refiling Tab
    │   ├── Asks List
    │   ├── Ask Detail
    │   ├── Defs (Дефіцити)
    │   └── Path (Послідовність)
    └── Profile Tab
        ├── Profile Settings
        └── Logout
```

## Настройка проекта

### 1. Создание API Client

Создай `mobile/src/lib/apiClient.ts`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApiClient } from '@shared/lib/apiClient';
import { initStorage } from '@shared/lib/storage';
import { SERVER_URL } from '@shared/lib/config';
import { Alert } from 'react-native';

// Инициализация storage для mobile
initStorage({
  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  },
  setItem: async (key: string, value: unknown) => {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Error setting item:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
});

// Создание API клиента
export const apiClient = createApiClient({
  baseURL: SERVER_URL,
  timeout: 10000,
  getAuthToken: async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },
  onError: (error) => {
    // Mobile-specific обработка ошибок
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        Alert.alert(
          'Помилка авторизації',
          data?.message || 'Будь ласка, увійдіть в систему знову.'
        );
        // TODO: Навигация на Login screen
      }

      if (status === 403) {
        Alert.alert(
          'Доступ заборонено',
          data?.message || 'У вас недостатньо прав для цієї операції.'
        );
      }

      if (status === 500) {
        Alert.alert('Помилка сервера', 'Спробуйте пізніше або зверніться до адміністратора.');
      }

      if (status === 404) {
        Alert.alert('Не знайдено', data?.message || 'Запитуваний ресурс не знайдено.');
      }
    } else if (error.request) {
      Alert.alert(
        "Помилка з'єднання",
        "Не вдалося зв'язатися з сервером. Перевірте підключення до інтернету."
      );
    }
  },
});

// Создание сервисов для всех модулей
import {
  createGetArtsByParamsService,
  createGetOneArtByArtikulService,
  createGetBtradeArtDataByArtikulService,
  createUpdateArtLimitByIdService,
} from '@shared/modules/arts';

import {
  createGetAskByIdService,
  createGetAsksByDateService,
  createCreateAskService,
  createUpdateAskByIdService,
  createDeleteAskByIdService,
  createCompleteAskByIdService,
  createRejectAskByIdService,
  createUpdateAskActionsByIdService,
} from '@shared/modules/asks';

import {
  createGetAllPosesService,
  createGetPosByIdService,
  createGetPosesByPalletIdService,
  createGetPosesByRowIdService,
  createGetPosesByArtikulService,
  createCreatePosService,
  createBulkCreatePosesService,
  createUpdatePosService,
  createDeletePosService,
} from '@shared/modules/poses';

import {
  createGetAllPalletsService,
  createGetPalletByIdService,
  createGetPalletsByRowIdService,
  createGetEmptyPalletsService,
  createCreatePalletService,
  createUpdatePalletService,
  createDeletePalletService,
  createEmptyPalletPosesService,
  createDeletePalletEmptyPosesService,
  createMovePalletPosesService,
  createDeletePalletPosesService,
} from '@shared/modules/pallets';

import {
  createGetRowsService,
  createGetRowByIdService,
  createGetRowByTitleService,
  createCreateRowService,
  createUpdateRowService,
  createDeleteRowService,
} from '@shared/modules/rows';

import {
  createGetLatestDefsService,
  createGetCalculationStatusService,
  createCalculateDefsService,
} from '@shared/modules/defs';

import {
  createLoginService,
  createRegisterService,
  createGetMeService,
  createUpdateUserService,
} from '@shared/modules/auth';

// Arts сервисы
export const artsServices = {
  getArtsByParams: createGetArtsByParamsService(apiClient),
  getOneArtByArtikul: createGetOneArtByArtikulService(apiClient),
  getBtradeArtDataByArtikul: createGetBtradeArtDataByArtikulService(apiClient),
  updateArtLimitById: createUpdateArtLimitByIdService(apiClient),
};

// Asks сервисы
export const asksServices = {
  getAskById: createGetAskByIdService(apiClient),
  getAsksByDate: createGetAsksByDateService(apiClient),
  createAsk: createCreateAskService(apiClient),
  updateAskById: createUpdateAskByIdService(apiClient),
  deleteAskById: createDeleteAskByIdService(apiClient),
  completeAskById: createCompleteAskByIdService(apiClient),
  rejectAskById: createRejectAskByIdService(apiClient),
  updateAskActionsById: createUpdateAskActionsByIdService(apiClient),
};

// Poses сервисы
export const posesServices = {
  getAllPoses: createGetAllPosesService(apiClient),
  getPosById: createGetPosByIdService(apiClient),
  getPosesByPalletId: createGetPosesByPalletIdService(apiClient),
  getPosesByRowId: createGetPosesByRowIdService(apiClient),
  getPosesByArtikul: createGetPosesByArtikulService(apiClient),
  createPos: createCreatePosService(apiClient),
  bulkCreatePoses: createBulkCreatePosesService(apiClient),
  updatePos: createUpdatePosService(apiClient),
  deletePos: createDeletePosService(apiClient),
};

// Pallets сервисы
export const palletsServices = {
  getAllPallets: createGetAllPalletsService(apiClient),
  getPalletById: createGetPalletByIdService(apiClient),
  getPalletsByRowId: createGetPalletsByRowIdService(apiClient),
  getEmptyPallets: createGetEmptyPalletsService(apiClient),
  createPallet: createCreatePalletService(apiClient),
  updatePallet: createUpdatePalletService(apiClient),
  deletePallet: createDeletePalletService(apiClient),
  emptyPalletPoses: createEmptyPalletPosesService(apiClient),
  deletePalletEmptyPoses: createDeletePalletEmptyPosesService(apiClient),
  movePalletPoses: createMovePalletPosesService(apiClient),
  deletePalletPoses: createDeletePalletPosesService(apiClient),
};

// Rows сервисы
export const rowsServices = {
  getRows: createGetRowsService(apiClient),
  getRowById: createGetRowByIdService(apiClient),
  getRowByTitle: createGetRowByTitleService(apiClient),
  createRow: createCreateRowService(apiClient),
  updateRow: createUpdateRowService(apiClient),
  deleteRow: createDeleteRowService(apiClient),
};

// Defs сервисы
export const defsServices = {
  getLatestDefs: createGetLatestDefsService(apiClient),
  getCalculationStatus: createGetCalculationStatusService(apiClient),
  calculateDefs: createCalculateDefsService(apiClient),
};

// Auth сервисы
export const authServices = {
  login: createLoginService(apiClient),
  register: createRegisterService(apiClient),
  getMe: createGetMeService(apiClient),
  updateUser: createUpdateUserService(apiClient),
};
```

### 2. Провайдеры

Создай `mobile/src/providers/QueryProvider.tsx`:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут (бывший cacheTime)
    },
    mutations: {
      retry: false,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Создай `mobile/src/providers/AuthProvider.tsx`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authServices } from '@/lib/apiClient';
import { hasRoleAccess, hasAnyRole as checkAnyRole, isTokenExpired } from '@shared/constants';
import type { User, RoleType, RegisterData, UpdateUserData, AuthContextType } from '@shared/modules/auth';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user and token from AsyncStorage on mount
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('auth_token');
        const storedUserJson = await AsyncStorage.getItem('auth_user');

        if (storedToken && storedUserJson) {
          // Проверяем, не истек ли токен
          if (isTokenExpired(storedToken)) {
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('auth_user');
          } else {
            const storedUser = JSON.parse(storedUserJson);
            setToken(storedToken);
            setUser(storedUser);
          }
        }
      } catch (error) {
        console.error('Error loading auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authServices.login({ username, password });
      setUser(data.user);
      setToken(data.token);

      // Save to AsyncStorage
      await AsyncStorage.setItem('auth_token', data.token);
      await AsyncStorage.setItem('auth_user', JSON.stringify(data.user));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Сталася невідома помилка');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: RegisterData) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await authServices.register(data);
        if (res && data.password) {
          await login(data.username, data.password);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Сталася невідома помилка');
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [login],
  );

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    setError(null);
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('auth_user');
  }, []);

  const updateUser = useCallback(
    async (data: UpdateUserData) => {
      if (!user || !token) return;
      setIsLoading(true);
      setError(null);
      try {
        const updatedUser = await authServices.updateUser(data);
        setUser(updatedUser);
        await AsyncStorage.setItem('auth_user', JSON.stringify(updatedUser));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Сталася невідома помилка');
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user, token],
  );

  const fetchCurrentUser = useCallback(async () => {
    if (!user || !token) return;
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = await authServices.getMe();
      setUser(currentUser);
      await AsyncStorage.setItem('auth_user', JSON.stringify(currentUser));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Сталася невідома помилка');
      }
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [user, token, logout]);

  const hasRole = useCallback(
    (requiredRole: RoleType): boolean => {
      if (!user || !user.role) return false;
      return hasRoleAccess(user.role, requiredRole);
    },
    [user],
  );

  const hasAnyRole = useCallback(
    (allowedRoles: RoleType[]): boolean => {
      if (!user || !user.role) return false;
      return checkAnyRole(user.role, allowedRoles);
    },
    [user],
  );

  const isAuthenticated = !!(user && token && !isTokenExpired(token));

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
        fetchCurrentUser,
        hasRole,
        hasAnyRole,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### 3. Структура навигации

Обнови `mobile/src/navigation/types.ts`:

```typescript
import type { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Arts Stack
export type ArtsStackParamList = {
  ArtsList: undefined;
  ArtDetail: { artikul: string };
  ArtsUpdate: undefined;
  ArtsUtils: undefined;
};

// Warehouse Stack
export type WarehouseStackParamList = {
  RowsList: undefined;
  RowDetail: { rowId: string; rowTitle: string };
  PalletDetail: { palletTitle: string };
  Stocks: undefined;
  StockDetail: { stock: string };
  Zones: undefined;
  WarehouseUtils: undefined;
};

// Pallets Stack (если отдельный таб)
export type PalletsStackParamList = {
  PalletsList: undefined;
  PalletDetail: { palletTitle: string };
};

// Refiling Stack
export type RefilingStackParamList = {
  AsksList: undefined;
  AskDetail: { id: string };
  Defs: undefined;
  Path: undefined;
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileSettings: undefined;
};

// Main Tabs
export type MainTabParamList = {
  Arts: NavigatorScreenParams<ArtsStackParamList>;
  Warehouse: NavigatorScreenParams<WarehouseStackParamList>;
  Refiling: NavigatorScreenParams<RefilingStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// Root Stack
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};
```

## Функционал приложения (из Web)

### 1. **Arts (Артикули)**

#### Страницы:

- **ArtsList** (`/arts/dashboard`)
  - Список всех артикулов с поиском
  - Infinite scroll пагинация
  - Фильтры по зонам
  - Карточки с фото, названием, зоной, лимитом

- **ArtDetail** (`/arts/:artikul`)
  - Детальная информация об артикуле
  - Фото артикула (большое)
  - Btrade данные (цена, количество)
  - Список всех позиций по складам (Pogrebi/Merezhi)
  - Редактирование лимита

- **ArtsUpdate** (`/arts/update`)
  - Массовое обновление артикулов через Excel
  - Загрузка файла
  - Предпросмотр данных
  - Подтверждение и отправка

- **ArtsUtils** (`/arts/utils`)
  - Различные утилиты для работы с артикулами

#### Hooks для Arts:

```typescript
import { artsServices } from '@/lib/apiClient';
import {
  useArtsQuery,
  useArtsInfiniteQuery,
  useOneArtQuery,
  useBtradeArtDataQuery,
  useUpdateArtLimitMutation,
} from '@shared/modules/arts';

// Список с пагинацией
const { data, isLoading } = useArtsQuery({
  page: 1,
  limit: 20,
  search: 'searchTerm',
  getArtsByParams: artsServices.getArtsByParams,
});

// Infinite scroll
const { data, fetchNextPage, hasNextPage } = useArtsInfiniteQuery({
  limit: 20,
  search: 'searchTerm',
  getArtsByParams: artsServices.getArtsByParams,
});

// Один артикул
const { data: art } = useOneArtQuery({
  artikul: 'ART123',
  getOneArtByArtikul: artsServices.getOneArtByArtikul,
});

// Btrade данные
const { data: btradeData } = useBtradeArtDataQuery({
  artikul: 'ART123',
  getBtradeArtDataByArtikul: artsServices.getBtradeArtDataByArtikul,
});

// Обновление лимита
const mutation = useUpdateArtLimitMutation({
  artikul: { artikul: 'ART123' },
  updateArtLimitById: artsServices.updateArtLimitById,
});
await mutation.mutateAsync({ id: 'artId', data: { limit: 10 } });
```

### 2. **Warehouse (Склад)**

#### Страницы:

- **RowsList** (`/wh/rows`)
  - Список всех рядов склада
  - Каждый ряд показывает количество паллет
  - CRUD операции с рядами

- **RowDetail** (`/wh/rows/:row`)
  - Детали ряда
  - Список паллет в ряду
  - Возможность создавать/удалять паллеты
  - Просмотр позиций

- **PalletDetail** (`/wh/pallets/:title`)
  - Информация о паллете
  - Список всех позиций на паллете
  - CRUD операции с позициями
  - Перемещение позиций между паллетами
  - Очистка паллеты

- **Stocks** (`/wh/stocks`)
  - Просмотр остатков по складам

- **Zones** (`/wh/zones`)
  - Управление зонами склада

#### Hooks для Warehouse:

```typescript
import { rowsServices, palletsServices, posesServices } from '@/lib/apiClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Rows
const { data: rows } = useQuery({
  queryKey: ['rows'],
  queryFn: ({ signal }) => rowsServices.getRows({ signal }),
});

const { data: row } = useQuery({
  queryKey: ['row', rowId],
  queryFn: ({ signal }) => rowsServices.getRowById(rowId, signal),
  enabled: !!rowId,
});

// Pallets
const { data: pallets } = useQuery({
  queryKey: ['pallets', rowId],
  queryFn: ({ signal }) => palletsServices.getPalletsByRowId(rowId, signal),
  enabled: !!rowId,
});

const { data: pallet } = useQuery({
  queryKey: ['pallet', palletId],
  queryFn: ({ signal }) => palletsServices.getPalletById(palletId, signal),
  enabled: !!palletId,
});

// Poses
const { data: poses } = useQuery({
  queryKey: ['poses', 'by-pallet', palletId],
  queryFn: ({ signal }) => posesServices.getPosesByPalletId(palletId, signal),
  enabled: !!palletId,
});

const { data: posesByArtikul } = useQuery({
  queryKey: ['poses', 'by-artikul', artikul],
  queryFn: ({ signal }) => posesServices.getPosesByArtikul(artikul, signal),
  enabled: !!artikul,
});

// Mutations
const createPosMutation = useMutation({
  mutationFn: (data) => posesServices.createPos(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['poses'] });
  },
});
```

### 3. **Refiling (Поповнення)**

#### Страницы:

- **AsksList** (`/refiling/asks`)
  - Список запитів на поповнення
  - Фильтр по датам (date picker)
  - Статистика: new, completed, rejected
  - Создание новых запитів

- **AskDetail** (`/refiling/asks/:id`)
  - Детали запиту
  - Информация о заказчике и исполнителе
  - Список позиций по артикулу
  - Действия: complete, reject, update
  - История actions

- **Defs** (`/refiling/defs`)
  - Список дефіцитів
  - Критичні (sharikQuant <= quant)
  - В лимиті (sharikQuant <= defLimit але > quant)
  - Возможность создать запит из дефицита
  - Запуск расчета дефіцитів (только ADMIN+)
  - Статус расчета с прогрессом

- **Path** (`/refiling/path`)
  - Послідовність дій для поповнення

#### Hooks для Refiling:

```typescript
import { asksServices, defsServices } from '@/lib/apiClient';
import { useDebounce } from '@shared/hooks';

// Asks
const { data: asks } = useQuery({
  queryKey: ['asks', 'by-date', date],
  queryFn: ({ signal }) => asksServices.getAsksByDate({ date, signal }),
  enabled: !!date,
});

const { data: ask } = useQuery({
  queryKey: ['asks', id],
  queryFn: () => asksServices.getAskById(id),
  enabled: !!id,
});

const createAskMutation = useMutation({
  mutationFn: (data) => asksServices.createAsk(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['asks'] });
    queryClient.invalidateQueries({ queryKey: ['defs'] });
  },
});

const completeAskMutation = useMutation({
  mutationFn: (solverId: string) => asksServices.completeAskById(askId, solverId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['asks'] });
  },
});

// Defs
const { data: defs } = useQuery({
  queryKey: ['defs', 'latest'],
  queryFn: () => defsServices.getLatestDefs(),
  staleTime: 5 * 60 * 1000,
});

const { data: calculationStatus, refetch } = useQuery({
  queryKey: ['defs', 'calculation-status'],
  queryFn: () => defsServices.getCalculationStatus(),
  refetchInterval: (data) => (data?.data.isRunning ? 5000 : false), // Poll каждые 5 сек если идет расчет
});

const calculateDefsMutation = useMutation({
  mutationFn: () => defsServices.calculateDefs(),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['defs'] });
    // Начать polling статуса
    refetch();
  },
});
```

### 4. **Profile (Профіль)**

#### Страницы:

- **ProfileSettings**
  - Информация о пользователе
  - Редактирование профиля
  - Роль пользователя
  - Logout

## Компоненты (рекомендации для Mobile)

### Структура компонентов

```
mobile/src/
├── screens/              # Главные экраны (страницы)
│   ├── arts/
│   │   ├── ArtsListScreen.tsx
│   │   ├── ArtDetailScreen.tsx
│   │   ├── ArtsUpdateScreen.tsx
│   │   └── ArtsUtilsScreen.tsx
│   ├── warehouse/
│   │   ├── RowsListScreen.tsx
│   │   ├── RowDetailScreen.tsx
│   │   ├── PalletDetailScreen.tsx
│   │   ├── StocksScreen.tsx
│   │   └── ZonesScreen.tsx
│   ├── refiling/
│   │   ├── AsksListScreen.tsx
│   │   ├── AskDetailScreen.tsx
│   │   ├── DefsScreen.tsx
│   │   └── PathScreen.tsx
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   └── profile/
│       └── ProfileScreen.tsx
├── components/           # Переиспользуемые компоненты
│   ├── cards/
│   │   ├── ArtCard.tsx
│   │   ├── AskCard.tsx
│   │   ├── PalletCard.tsx
│   │   ├── PosCard.tsx
│   │   └── RowCard.tsx
│   ├── lists/
│   │   ├── ArtsList.tsx
│   │   ├── PosesList.tsx
│   │   └── ...
│   ├── forms/
│   │   ├── CreateAskForm.tsx
│   │   ├── CreatePosForm.tsx
│   │   └── ...
│   └── shared/
│       ├── SearchBar.tsx
│       ├── LoadingIndicator.tsx
│       ├── ErrorView.tsx
│       └── ...
├── lib/
│   └── apiClient.ts
├── providers/
│   ├── AuthProvider.tsx
│   └── QueryProvider.tsx
└── navigation/
    ├── RootNavigator.tsx
    ├── AuthStackNavigator.tsx
    ├── MainTabNavigator.tsx
    ├── ArtsStackNavigator.tsx
    ├── WarehouseStackNavigator.tsx
    ├── RefilingStackNavigator.tsx
    ├── ProfileStackNavigator.tsx
    └── types.ts
```

### Примеры компонентов

#### ArtCard (карточка артикула)

```typescript
import { View, Text, Image, TouchableOpacity } from 'react-native';
import type { ArtDto } from '@shared/modules/arts';

interface ArtCardProps {
  art: ArtDto;
  onPress: () => void;
}

export function ArtCard({ art, onPress }: ArtCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-2 rounded-lg border border-gray-200 bg-white p-4"
    >
      <View className="flex-row gap-4">
        {/* Фото артикула */}
        <Image
          source={{ uri: `https://example.com/images/${art.artikul}.jpg` }}
          className="h-20 w-20 rounded"
          resizeMode="cover"
        />

        <View className="flex-1">
          <Text className="text-base font-semibold">{art.nameukr}</Text>
          <Text className="text-sm text-gray-500">{art.artikul}</Text>

          <View className="mt-2 flex-row justify-between">
            <Text className="text-xs text-gray-600">Зона: {art.zone}</Text>
            {art.limit && (
              <Text className="text-xs text-blue-600">Ліміт: {art.limit}</Text>
            )}
          </View>

          {art.btradeStock && (
            <Text className="mt-1 text-xs text-green-600">
              Залишок: {art.btradeStock.value}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
```

#### ArtsListScreen (экран списка)

```typescript
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useArtsInfiniteQuery } from '@shared/modules/arts';
import { artsServices } from '@/lib/apiClient';
import { ArtCard } from '@/components/cards/ArtCard';
import { SearchBar } from '@/components/shared/SearchBar';
import type { ArtsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ArtsStackParamList, 'ArtsList'>;

export function ArtsListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useArtsInfiniteQuery({
    limit: 20,
    search,
    getArtsByParams: artsServices.getArtsByParams,
  });

  const arts = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="mt-2 text-gray-600">Завантаження артикулів...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Помилка: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Пошук артикулів..."
      />

      <FlatList
        data={arts}
        renderItem={({ item }) => (
          <ArtCard
            art={item}
            onPress={() =>
              navigation.navigate('ArtDetail', { artikul: item.artikul })
            }
          />
        )}
        keyExtractor={(item) => item._id}
        contentContainerClassName="p-4"
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View className="items-center py-8">
            <Text className="text-gray-500">Артикулів не знайдено</Text>
          </View>
        }
      />
    </View>
  );
}
```

#### AskCard (карточка запиту)

```typescript
import { View, Text, TouchableOpacity } from 'react-native';
import type { AskDto } from '@shared/modules/asks';
import { format } from 'date-fns';

interface AskCardProps {
  ask: AskDto;
  onPress: () => void;
}

export function AskCard({ ask, onPress }: AskCardProps) {
  const statusColors = {
    new: 'bg-blue-100',
    completed: 'bg-green-100',
    rejected: 'bg-red-100',
    fail: 'bg-orange-100',
    solved: 'bg-purple-100',
  };

  const statusTextColors = {
    new: 'text-blue-800',
    completed: 'text-green-800',
    rejected: 'text-red-800',
    fail: 'text-orange-800',
    solved: 'text-purple-800',
  };

  const statusLabels = {
    new: 'Новий',
    completed: 'Виконано',
    rejected: 'Відхилено',
    fail: 'Провал',
    solved: 'Вирішено',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-2 rounded-lg border border-gray-200 bg-white p-4"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold">{ask.artikul}</Text>
          {ask.nameukr && (
            <Text className="text-sm text-gray-500">{ask.nameukr}</Text>
          )}
          {ask.quant && (
            <Text className="mt-1 text-sm">Кількість: {ask.quant}</Text>
          )}
          {ask.com && (
            <Text className="mt-1 text-sm text-gray-600">
              Коментар: {ask.com}
            </Text>
          )}
        </View>

        <View className={`rounded px-3 py-1 ${statusColors[ask.status]}`}>
          <Text className={`text-xs font-medium ${statusTextColors[ask.status]}`}>
            {statusLabels[ask.status]}
          </Text>
        </View>
      </View>

      <View className="mt-3 border-t border-gray-100 pt-3">
        <Text className="text-xs text-gray-500">
          Запитав: {ask.askerData.fullname}
        </Text>
        {ask.solverData && (
          <Text className="text-xs text-gray-500">
            Виконавець: {ask.solverData.fullname}
          </Text>
        )}
        <Text className="text-xs text-gray-400">
          {format(new Date(ask.createdAt), 'dd.MM.yyyy HH:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
```

## Паттерны разработки

### 1. **Использование React Query хуков**

Всегда используй хуки из shared с dependency injection:

```typescript
// ✅ Правильно
import { useArtsQuery } from '@shared/modules/arts';
import { artsServices } from '@/lib/apiClient';

const { data } = useArtsQuery({
  page: 1,
  limit: 20,
  getArtsByParams: artsServices.getArtsByParams,
});

// ❌ Неправильно - прямой вызов сервиса без хука
const data = await artsServices.getArtsByParams({ page: 1, limit: 20 });
```

### 2. **Обработка состояний загрузки**

```typescript
import { ActivityIndicator, View, Text } from 'react-native';

function MyScreen() {
  const { data, isLoading, error } = useQuery(...);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-center text-red-500">
          Помилка: {error.message}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Дані відсутні</Text>
      </View>
    );
  }

  return <View>...</View>;
}
```

### 3. **Мутации с обратной связью**

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { asksServices } from '@/lib/apiClient';

function useCompleteAskMutation(askId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (solverId: string) => asksServices.completeAskById(askId, solverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asks'] });
      Alert.alert('Успіх', 'Запит виконано');
    },
    onError: (error) => {
      Alert.alert('Помилка', error.message);
    },
  });
}
```

### 4. **Навигация с типами**

```typescript
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ArtsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ArtsStackParamList, 'ArtDetail'>;

export function ArtDetailScreen({ route, navigation }: Props) {
  const { artikul } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToList = () => {
    navigation.navigate('ArtsList');
  };

  return <View>...</View>;
}
```

### 5. **Debounce для поиска**

```typescript
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useDebounce } from '@shared/hooks';
import { useArtsInfiniteQuery } from '@shared/modules/arts';
import { artsServices } from '@/lib/apiClient';

function ArtsWithSearch() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data } = useArtsInfiniteQuery({
    limit: 20,
    search: debouncedSearch, // Используй debounced значение
    getArtsByParams: artsServices.getArtsByParams,
  });

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Пошук..."
      />
      {/* список */}
    </View>
  );
}
```

## Полный функционал Web (что реализовать в Mobile)

### Модули и их возможности

| Модуль      | Главная страница           | Детальная страница          | CRUD                 | Дополнительный функционал           |
| ----------- | -------------------------- | --------------------------- | -------------------- | ----------------------------------- |
| **Arts**    | Список артикулов с поиском | Детали + позиции по складам | Update limit         | Excel upload, Btrade данные         |
| **Rows**    | Список рядов               | Ряд + список паллет         | Create/Update/Delete | -                                   |
| **Pallets** | -                          | Паллета + позиции           | Create/Update/Delete | Перемещение поз, очистка            |
| **Poses**   | -                          | Позиция                     | Create/Update/Delete | Bulk create, группировка по складам |
| **Asks**    | Список по датам            | Детали запиту               | Create/Update/Delete | Complete/Reject, actions history    |
| **Defs**    | Список дефіцитів           | -                           | -                    | Расчет (ADMIN), создание asks       |

### Роли и права доступа

```typescript
import { RoleType } from '@shared/constants';
import { useAuth } from '@/providers/AuthProvider';

// В компонентах
const { user, hasRole, hasAnyRole } = useAuth();

// Проверка ролей
if (hasRole(RoleType.ADMIN)) {
  // Показать админский функционал
}

if (hasAnyRole([RoleType.ADMIN, RoleType.PRIME])) {
  // Показать для админов и выше
}

// Условный рендеринг
{hasRole(RoleType.ADMIN) && (
  <Button title="Розрахувати дефіцити" onPress={calculateDefs} />
)}

// Права доступа
const permissions = {
  canCalculateDefs: hasRole(RoleType.ADMIN), // ADMIN и PRIME
  canDeleteRow: hasRole(RoleType.ADMIN),
  canEditPallet: hasRole(RoleType.ADMIN),
  canCreateAsk: hasRole(RoleType.USER), // Все роли
  canCompleteAsk: hasRole(RoleType.ADMIN),
  canDeleteAsk: (ask: AskDto) => {
    // Свой запит или админ
    return user?._id === ask.asker || hasRole(RoleType.ADMIN);
  },
};
```

## Примеры экранов

### ArtsListScreen (полный пример)

```typescript
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useArtsInfiniteQuery } from '@shared/modules/arts';
import { artsServices } from '@/lib/apiClient';
import { ArtCard } from '@/components/cards/ArtCard';
import { SearchBar } from '@/components/shared/SearchBar';
import type { ArtsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ArtsStackParamList, 'ArtsList'>;

export function ArtsListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useArtsInfiniteQuery({
    limit: 20,
    search,
    getArtsByParams: artsServices.getArtsByParams,
  });

  const arts = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="mt-2 text-gray-600">Завантаження артикулів...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-center text-red-500">
          Помилка: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="border-b border-gray-200 bg-white p-4">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Пошук артикулів..."
        />
      </View>

      <FlatList
        data={arts}
        renderItem={({ item }) => (
          <ArtCard
            art={item}
            onPress={() =>
              navigation.navigate('ArtDetail', { artikul: item.artikul })
            }
          />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator color="#0ea5e9" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View className="items-center py-8">
            <Text className="text-gray-500">Артикулів не знайдено</Text>
          </View>
        }
      />
    </View>
  );
}
```

### LoginScreen

```typescript
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Помилка', 'Заповніть всі поля');
      return;
    }

    try {
      await login(username, password);
      // Навигация происходит автоматически через RootNavigator
    } catch (error) {
      // Ошибка уже обработана в AuthProvider
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-6">
      <View className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <Text className="mb-6 text-center text-2xl font-bold">BTW-WH</Text>

        <TextInput
          className="mb-4 rounded border border-gray-300 p-3"
          placeholder="Логін"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          className="mb-6 rounded border border-gray-300 p-3"
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity
          className="rounded bg-blue-500 p-3"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center font-semibold text-white">Увійти</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

## Работа с формами

### CreateAskForm

```typescript
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { asksServices } from '@/lib/apiClient';
import { useAuth } from '@/providers/AuthProvider';
import type { CreateAskRequest } from '@shared/modules/asks';

const askSchema = z.object({
  artikul: z.string().min(1, "Артикул обов'язковий"),
  nameukr: z.string().optional(),
  quant: z.string().optional(),
  com: z.string().optional(),
});

type AskFormData = z.infer<typeof askSchema>;

interface CreateAskFormProps {
  onSuccess?: () => void;
}

export function CreateAskForm({ onSuccess }: CreateAskFormProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AskFormData>({
    resolver: zodResolver(askSchema),
    defaultValues: {
      artikul: '',
      nameukr: '',
      quant: '',
      com: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateAskRequest) => asksServices.createAsk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asks'] });
      Alert.alert('Успіх', 'Запит створено');
      reset();
      onSuccess?.();
    },
    onError: (error: Error) => {
      Alert.alert('Помилка', error.message);
    },
  });

  const onSubmit = (data: AskFormData) => {
    if (!user) return;

    mutation.mutate({
      ...data,
      askerId: user._id,
    });
  };

  return (
    <View className="p-4">
      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium">Артикул *</Text>
        <Controller
          control={control}
          name="artikul"
          render={({ field }) => (
            <TextInput
              className="rounded border border-gray-300 p-3"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Введіть артикул"
            />
          )}
        />
        {errors.artikul && (
          <Text className="mt-1 text-xs text-red-500">
            {errors.artikul.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium">Назва</Text>
        <Controller
          control={control}
          name="nameukr"
          render={({ field }) => (
            <TextInput
              className="rounded border border-gray-300 p-3"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Назва товару"
            />
          )}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium">Кількість</Text>
        <Controller
          control={control}
          name="quant"
          render={({ field }) => (
            <TextInput
              className="rounded border border-gray-300 p-3"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Кількість"
              keyboardType="numeric"
            />
          )}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium">Коментар</Text>
        <Controller
          control={control}
          name="com"
          render={({ field }) => (
            <TextInput
              className="rounded border border-gray-300 p-3"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Коментар"
              multiline
              numberOfLines={3}
            />
          )}
        />
      </View>

      <TouchableOpacity
        className="rounded bg-blue-500 p-3"
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-center font-semibold text-white">Створити</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
```

## Полезные утилиты

### DatePicker для Asks

```typescript
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { format } from 'date-fns';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <TouchableOpacity
        className="rounded border border-gray-300 p-3"
        onPress={() => setShow(true)}
      >
        <Text>{format(value, 'dd.MM.yyyy')}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShow(Platform.OS === 'ios');
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}
```

### SearchBar

```typescript
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
      <Ionicons name="search" size={20} color="#9ca3af" />
      <TextInput
        className="flex-1"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Пошук...'}
        placeholderTextColor="#9ca3af"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={20} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  );
}
```

### Pull to Refresh

```typescript
import { RefreshControl, ScrollView } from 'react-native';

function MyScreen() {
  const { data, refetch, isRefetching } = useQuery(...);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          colors={['#0ea5e9']} // Android
          tintColor="#0ea5e9" // iOS
        />
      }
    >
      {/* content */}
    </ScrollView>
  );
}
```

### StatusBadge для Asks

```typescript
import { View, Text } from 'react-native';
import type { AskStatus } from '@shared/modules/asks';

interface StatusBadgeProps {
  status: AskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Новий' },
    completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Виконано' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Відхилено' },
    fail: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Провал' },
    solved: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Вирішено' },
  };

  const { bg, text, label } = config[status] || config.new;

  return (
    <View className={`rounded px-2 py-1 ${bg}`}>
      <Text className={`text-xs font-medium ${text}`}>{label}</Text>
    </View>
  );
}
```

## Структура Web → Mobile (маппинг страниц)

| Web Route            | Mobile Screen      | Navigator                 | Описание                 |
| -------------------- | ------------------ | ------------------------- | ------------------------ |
| `/login`             | LoginScreen        | AuthStack                 | Вход в систему           |
| `/register`          | RegisterScreen     | AuthStack                 | Регистрация              |
| `/`                  | MainScreen         | MainTabs                  | Главная (Dashboard)      |
| `/arts/dashboard`    | ArtsListScreen     | ArtsStack → MainTabs      | Список артикулов         |
| `/arts/:artikul`     | ArtDetailScreen    | ArtsStack                 | Детали артикула          |
| `/arts/update`       | ArtsUpdateScreen   | ArtsStack                 | Загрузка Excel           |
| `/arts/utils`        | ArtsUtilsScreen    | ArtsStack                 | Утилиты                  |
| `/wh/rows`           | RowsListScreen     | WarehouseStack → MainTabs | Список рядов             |
| `/wh/rows/:row`      | RowDetailScreen    | WarehouseStack            | Детали ряда + паллеты    |
| `/wh/pallets/:title` | PalletDetailScreen | WarehouseStack            | Детали паллеты + позиции |
| `/wh/stocks`         | StocksScreen       | WarehouseStack            | Остатки                  |
| `/wh/zones`          | ZonesScreen        | WarehouseStack            | Зоны                     |
| `/refiling/asks`     | AsksListScreen     | RefilingStack → MainTabs  | Список запитів           |
| `/refiling/asks/:id` | AskDetailScreen    | RefilingStack             | Детали запиту            |
| `/refiling/defs`     | DefsScreen         | RefilingStack             | Дефіцити                 |
| `/refiling/path`     | PathScreen         | RefilingStack             | Послідовність            |
| `/profile`           | ProfileScreen      | ProfileStack → MainTabs   | Профіль користувача      |

## Меню приложения (из Web)

### Main Tabs (4 таба)

1. **Arts (Артикули)** 🔲
   - Артикули (список)
   - Оновити базу (Excel upload)
   - Утиліти

2. **Warehouse (Склад)** 🏢
   - Ряди (список рядов)
   - Залишки (остатки)
   - Зони (зоны склада)
   - Утиліти

3. **Refiling (Поповнення)** 📋
   - Запити (asks)
   - Дефіцити (дефициты)
   - Послідовність (path)

4. **Profile (Профіль)** 👤
   - Налаштування
   - Вихід

## Типы данных

### Основные типы (из shared)

```typescript
// Arts
import type {
  ArtDto, // Один артикул
  ArtsDto, // Список артикулов с пагинацией
  BtradeArtInfoDto, // Данные из Btrade
} from '@shared/modules/arts';

// Asks
import type {
  AskDto, // Один запит
  AskStatus, // Статус: new | completed | rejected | fail | solved
  GetAsksByDateResponse, // Список запитів по дате
} from '@shared/modules/asks';

// Poses
import type {
  IPos, // Позиция на складе
  CreatePosDto, // Данные для создания
  GetPosesByArtikulResponse, // Позиции по артикулу
} from '@shared/modules/poses';

// Pallets
import type {
  IPallet, // Полная паллета с позициями
  PalletShortDto, // Краткая информация о паллете
} from '@shared/modules/pallets';

// Rows
import type {
  RowDto, // Ряд с паллетами
  CreateRowDto, // Данные для создания
} from '@shared/modules/rows';

// Defs
import type {
  Def, // Дефицит
  DeficitItem, // Элемент дефицита
  DefsCalculationStatus, // Статус расчета
} from '@shared/modules/defs';

// Auth
import type {
  User, // Пользователь
  RoleType, // USER | ADMIN | PRIME
  LoginData, // Данные для логина
  RegisterData, // Данные для регистрации
} from '@shared/modules/auth';
```

## Навигаторы (примеры)

### AuthStackNavigator

```typescript
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen';
import type { AuthStackParamList } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Реєстрація' }}
      />
    </Stack.Navigator>
  );
}
```

### ArtsStackNavigator

```typescript
import { createStackNavigator } from '@react-navigation/stack';
import { ArtsListScreen } from '@/screens/arts/ArtsListScreen';
import { ArtDetailScreen } from '@/screens/arts/ArtDetailScreen';
import type { ArtsStackParamList } from './types';

const Stack = createStackNavigator<ArtsStackParamList>();

export function ArtsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArtsList"
        component={ArtsListScreen}
        options={{ title: 'Артикули' }}
      />
      <Stack.Screen
        name="ArtDetail"
        component={ArtDetailScreen}
        options={{ title: 'Деталі артикула' }}
      />
      {/* Добавь другие экраны по необходимости */}
    </Stack.Navigator>
  );
}
```

### MainTabNavigator

```typescript
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ArtsStackNavigator } from './ArtsStackNavigator';
import { WarehouseStackNavigator } from './WarehouseStackNavigator';
import { RefilingStackNavigator } from './RefilingStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Arts') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Warehouse') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Refiling') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Arts"
        component={ArtsStackNavigator}
        options={{ title: 'Артикули' }}
      />
      <Tab.Screen
        name="Warehouse"
        component={WarehouseStackNavigator}
        options={{ title: 'Склад' }}
      />
      <Tab.Screen
        name="Refiling"
        component={RefilingStackNavigator}
        options={{ title: 'Поповнення' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ title: 'Профіль' }}
      />
    </Tab.Navigator>
  );
}
```

## Troubleshooting

### Storage not initialized

Убедись что `lib/apiClient.ts` импортируется до первого использования API:

```typescript
// App.tsx
import './src/lib/apiClient'; // <-- важно импортировать первым!
import { AuthProvider } from './src/providers/AuthProvider';
import { QueryProvider } from './src/providers/QueryProvider';
```

### TypeScript ошибки

Настрой `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["../shared/*"]
    },
    "strict": true,
    "skipLibCheck": true
  }
}
```

### Metro bundler для monorepo

Обнови `metro.config.js`:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch shared folder
config.watchFolders = [workspaceRoot];

// Resolve modules from workspace
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Resolve shared package
config.resolver.extraNodeModules = {
  '@shared': path.resolve(workspaceRoot, 'shared'),
};

module.exports = config;
```

### Babel config для NativeWind

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

## Примеры использования

### Импорты

```typescript
// Типы
import type { ArtDto, ArtsDto } from '@shared/modules/arts';
import type { AskDto, AskStatus } from '@shared/modules/asks';
import type { User, RoleType } from '@shared/modules/auth';
import type { IPos, IPallet } from '@shared/modules/poses';
import type { RowDto } from '@shared/modules/rows';

// Константы
import { RoleType, getRoleLabel, hasRoleAccess } from '@shared/constants';

// Hooks
import { useDebounce } from '@shared/hooks';

// Services (через apiClient)
import { artsServices, asksServices, posesServices } from '@/lib/apiClient';
```

### Conditional Rendering по ролям

```typescript
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { RoleType } from '@shared/constants';

function AdminPanel() {
  const { hasRole, hasAnyRole } = useAuth();

  return (
    <View>
      {/* Только для ADMIN и PRIME */}
      {hasRole(RoleType.ADMIN) && (
        <TouchableOpacity className="rounded bg-red-500 p-3">
          <Text className="text-white">Видалити</Text>
        </TouchableOpacity>
      )}

      {/* Для любой роли кроме USER */}
      {hasAnyRole([RoleType.ADMIN, RoleType.PRIME]) && (
        <TouchableOpacity className="rounded bg-orange-500 p-3">
          <Text className="text-white">Розрахувати дефіцити</Text>
        </TouchableOpacity>
      )}

      {/* Для всех */}
      <TouchableOpacity className="rounded bg-blue-500 p-3">
        <Text className="text-white">Створити запит</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Рекомендуемая последовательность разработки

### Этап 1: Базовая инфраструктура (1-2 дня)

1. ✅ Настроить apiClient.ts
2. ✅ Создать AuthProvider и QueryProvider
3. ✅ Обновить App.tsx
4. ✅ Настроить навигацию (RootNavigator, AuthStack, MainTabs)

### Этап 2: Auth модуль (1 день)

1. ✅ LoginScreen
2. ✅ RegisterScreen
3. ✅ ProfileScreen

### Этап 3: Arts модуль (2-3 дня)

1. ✅ ArtsListScreen (infinite scroll)
2. ✅ ArtDetailScreen (детали + позиции)
3. ⏳ ArtsUpdateScreen (Excel upload - optional)

### Этап 4: Warehouse модуль (3-4 дня)

1. ✅ RowsListScreen
2. ✅ RowDetailScreen (ряд + паллеты)
3. ✅ PalletDetailScreen (паллета + позиции)
4. ✅ CRUD операции для Rows, Pallets, Poses

### Этап 5: Refiling модуль (2-3 дня)

1. ✅ AsksListScreen (с date picker)
2. ✅ AskDetailScreen (детали + actions)
3. ✅ DefsScreen (список дефіцитів)
4. ⏳ PathScreen (optional)

### Этап 6: Дополнительный функционал (1-2 дня)

1. ⏳ Stocks, Zones
2. ⏳ Утилиты
3. ⏳ Оптимизация и полировка

## Ресурсы

- `shared/README.md` - документация shared пакета
- `web/src/doc/modules-architecture.md` - архитектура модулей
- `web/src/router.tsx` - структура всех страниц web
- `web/src/components/layout/sidebar/data/app-sidebar-data.tsx` - меню web
- React Navigation docs: https://reactnavigation.org/
- NativeWind docs: https://www.nativewind.dev/
