# Mobile Quick Start Guide

## Быстрый старт для разработки mobile приложения

### Шаг 1: Установка зависимостей

```bash
cd mobile
npm install
```

### Шаг 2: API Client

Создай `mobile/src/lib/apiClient.ts`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApiClient, initStorage } from '@shared/lib/apiClient';
import { SERVER_URL } from '@shared/lib/config';
import { Alert } from 'react-native';

// Инициализация storage
initStorage({
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (key: string, value: unknown) => {
    await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  clear: async () => {
    await AsyncStorage.clear();
  },
});

// API клиент
export const apiClient = createApiClient({
  baseURL: SERVER_URL,
  getAuthToken: async () => AsyncStorage.getItem('auth_token'),
  onError: (error) => {
    if (error.response?.status === 401) {
      Alert.alert('Помилка', 'Увійдіть в систему');
    }
  },
});

// Сервисы (см. MOBILE_DEVELOPMENT_GUIDE.md для полного списка)
import { createGetArtsByParamsService } from '@shared/modules/arts';
export const artsServices = {
  getArtsByParams: createGetArtsByParamsService(apiClient),
  // ... остальные
};
```

**Полный код** смотри в `MOBILE_DEVELOPMENT_GUIDE.md` → Настройка проекта → API Client

### Шаг 3: Провайдеры

Создай `mobile/src/providers/QueryProvider.tsx`:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Создай `mobile/src/providers/AuthProvider.tsx`:

**Полный код** смотри в `MOBILE_DEVELOPMENT_GUIDE.md` → Настройка проекта → Провайдеры

### Шаг 4: App.tsx

Обнови `mobile/App.tsx`:

```typescript
import './src/lib/apiClient'; // ⚠️ Первый импорт - важно!
import { QueryProvider } from './src/providers/QueryProvider';
import { AuthProvider } from './src/providers/AuthProvider';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryProvider>
  );
}
```

### Шаг 5: Навигация

Обнови `mobile/src/navigation/types.ts`:

**Полный код типов** смотри в `MOBILE_DEVELOPMENT_GUIDE.md` → Структура навигации

Обнови `mobile/src/navigation/RootNavigator.tsx`:

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@/providers/AuthProvider';
import { AuthStackNavigator } from './AuthStackNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // TODO: Add splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Шаг 6: Первый экран

Создай `mobile/src/screens/arts/ArtsListScreen.tsx`:

```typescript
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useState } from 'react';
import { useArtsInfiniteQuery } from '@shared/modules/arts';
import { artsServices } from '@/lib/apiClient';
import { ArtCard } from '@/components/cards/ArtCard';
import { SearchBar } from '@/components/shared/SearchBar';

export function ArtsListScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useArtsInfiniteQuery({
      limit: 20,
      search,
      getArtsByParams: artsServices.getArtsByParams,
    });

  const arts = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <SearchBar value={search} onChangeText={setSearch} />
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
        onEndReached={() => hasNextPage && fetchNextPage()}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </View>
  );
}
```

### Шаг 7: Компоненты

Создай `mobile/src/components/cards/ArtCard.tsx`:

```typescript
import { View, Text, Image, TouchableOpacity } from 'react-native';
import type { ArtDto } from '@shared/modules/arts';

export function ArtCard({ art, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="border-b bg-white p-4">
      <View className="flex-row gap-4">
        <Image
          source={{ uri: `https://example.com/${art.artikul}.jpg` }}
          className="h-16 w-16 rounded"
        />
        <View className="flex-1">
          <Text className="font-semibold">{art.nameukr}</Text>
          <Text className="text-sm text-gray-500">{art.artikul}</Text>
          <Text className="text-xs">Зона: {art.zone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
```

## Маппинг Web → Mobile

| Web Page             | Mobile Screen      | Navigator      | Status   |
| -------------------- | ------------------ | -------------- | -------- |
| `/login`             | LoginScreen        | AuthStack      | ⏳ To Do |
| `/arts/dashboard`    | ArtsListScreen     | ArtsStack      | ⏳ To Do |
| `/arts/:artikul`     | ArtDetailScreen    | ArtsStack      | ⏳ To Do |
| `/wh/rows`           | RowsListScreen     | WarehouseStack | ⏳ To Do |
| `/wh/rows/:row`      | RowDetailScreen    | WarehouseStack | ⏳ To Do |
| `/wh/pallets/:title` | PalletDetailScreen | WarehouseStack | ⏳ To Do |
| `/refiling/asks`     | AsksListScreen     | RefilingStack  | ⏳ To Do |
| `/refiling/asks/:id` | AskDetailScreen    | RefilingStack  | ⏳ To Do |
| `/refiling/defs`     | DefsScreen         | RefilingStack  | ⏳ To Do |

## Команды для запуска

```bash
# Запуск dev сервера
npm run start

# Android
npm run android

# iOS
npm run ios

# Web (для тестирования)
npm run web
```

## Чек-лист

- [ ] Установлены зависимости (`npm install`)
- [ ] Создан `lib/apiClient.ts`
- [ ] Созданы провайдеры (Auth, Query)
- [ ] Обновлен `App.tsx`
- [ ] Настроена навигация (типы, навигаторы)
- [ ] Создан LoginScreen
- [ ] Создан ArtsListScreen (первый экран)
- [ ] Протестировано на эмуляторе

## Следующие шаги

1. Создай базовые навигаторы
2. Реализуй Auth экраны (Login, Register)
3. Реализуй Arts модуль (список + детали)
4. Реализуй Warehouse модуль
5. Реализуй Refiling модуль
6. Добавь Profile экран

## Полезные ссылки

- Полное руководство: `MOBILE_DEVELOPMENT_GUIDE.md`
- Shared API: `../shared/README.md`
- Web архитектура: `../web/src/doc/modules-architecture.md`
