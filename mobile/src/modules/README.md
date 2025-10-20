# API Модули для Мобильного Приложения

## Структура

Мобильное приложение использует модульную архитектуру API, аналогичную веб-версии:

```
src/modules/
├── auth/           # Аутентификация
├── poses/          # Позиции товаров
├── pallets/        # Паллеты
└── index.ts        # Главный экспорт
```

## Модуль Poses (Позиции)

### Типы

- `IPos` - основная сущность позиции
- `CreatePosDto` - данные для создания позиции
- `UpdatePosDto` - данные для обновления позиции
- `PosListResponse` - ответ со списком позиций

### API Функции

- `getAllPoses()` - получение всех позиций
- `getPosesByPalletId()` - получение позиций по паллете
- `createPos()` - создание позиции
- `updatePos()` - обновление позиции
- `deletePos()` - удаление позиции

### React Query Хуки

- `usePosesByPalletQuery()` - получение позиций по паллете
- `useCreatePosMutation()` - создание позиции
- `useDeletePosMutation()` - удаление позиции

## Модуль Auth (Аутентификация)

### Типы

- `User` - пользователь
- `AuthContextType` - контекст аутентификации
- `LoginData`, `RegisterData` - данные для входа/регистрации

### API Функции

- `login()` - вход в систему
- `register()` - регистрация
- `getCurrentUser()` - получение текущего пользователя
- `updateUser()` - обновление пользователя

### React Query Хуки

- `useLoginMutation()` - мутация для входа
- `useRegisterMutation()` - мутация для регистрации
- `useUpdateUserMutation()` - мутация для обновления

## Модуль Pallets (Паллеты)

### Типы

- `IPallet` - основная сущность паллеты
- `CreatePalletDto` - данные для создания паллеты
- `UpdatePalletDto` - данные для обновления паллеты

## Использование

```typescript
import { usePosesByPalletQuery, useCreatePosMutation } from '../modules/poses/api';

// В компоненте
const { data: posesData, isLoading, error } = usePosesByPalletQuery(palletId);
const createPosMutation = useCreatePosMutation();

// Создание позиции
await createPosMutation.mutateAsync({
  palletId: '123',
  rowId: '456',
  artikul: 'ART001',
  quant: 100,
  boxes: 10,
  sklad: 'main',
});
```

## Конфигурация

API клиент настроен на базовый URL: `https://btw-wh.up.railway.app/api/`

Автоматически добавляет токен аутентификации из AsyncStorage в заголовки запросов.

## Обработка ошибок

Все API функции включают обработку ошибок:

- 401 - неавторизован (автоматический logout)
- 500 - ошибка сервера
- Сетевые ошибки

## Кеширование

React Query настроен с оптимальными параметрами кеширования:

- `staleTime`: 5 минут
- `gcTime`: 10 минут
- Автоматическая инвалидация кеша при мутациях
