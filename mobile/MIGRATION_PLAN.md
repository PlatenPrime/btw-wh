# Mobile Migration Plan

## Текущее состояние

В `mobile/src/` уже есть некоторые файлы:

- ✅ `lib/apiClient.ts` - старая версия, нужно переписать
- ✅ `providers/AuthProvider.tsx` - старая версия, нужно переписать
- ✅ `providers/QueryProvider.tsx` - проверить и возможно оставить
- ✅ `modules/auth/` - старая версия, удалить
- ✅ `modules/poses/` - старая версия, удалить
- ✅ `modules/pallets/` - старая версия, удалить
- ✅ Навигация и экраны - переписать под новую архитектуру

## План миграции

### Этап 1: Очистка (30 мин)

1. **Удалить старые модули:**

   ```bash
   cd mobile/src
   rm -rf modules/auth/api
   rm -rf modules/poses/api
   rm -rf modules/pallets/api
   # Оставить только README.md если есть
   ```

2. **Бэкап старого кода (опционально):**
   ```bash
   # Если хочешь сохранить старый код
   cp -r mobile/src/lib mobile/src/lib.old
   cp -r mobile/src/providers mobile/src/providers.old
   ```

### Этап 2: Новый API Client (1 час)

1. **Перезаписать `mobile/src/lib/apiClient.ts`:**
   - Скопируй код из `QUICK_START.md` или `MOBILE_DEVELOPMENT_GUIDE.md`
   - Код включает:
     - `initStorage` с AsyncStorage
     - `createApiClient` с error handling
     - Все сервисы (arts, asks, poses, pallets, rows, defs, auth)

2. **Проверить импорты:**
   ```typescript
   // В начале файла должно быть
   import AsyncStorage from '@react-native-async-storage/async-storage';
   import { createApiClient } from '@shared/lib/apiClient';
   import { initStorage } from '@shared/lib/storage';
   import { SERVER_URL } from '@shared/lib/config';
   ```

### Этап 3: Провайдеры (30 мин)

1. **Обновить `mobile/src/providers/AuthProvider.tsx`:**
   - Скопируй код из `MOBILE_DEVELOPMENT_GUIDE.md`
   - Использует `authServices` из `@/lib/apiClient`
   - Работает с `@shared/modules/auth` типами

2. **Проверить `mobile/src/providers/QueryProvider.tsx`:**
   - Если уже есть и настроен - оставить
   - Если нет - создать по примеру из guide

### Этап 4: Навигация (1 час)

1. **Обновить `mobile/src/navigation/types.ts`:**
   - Скопируй типы из `MOBILE_DEVELOPMENT_GUIDE.md`
   - Добавь все необходимые Stacks

2. **Обновить навигаторы:**
   - `RootNavigator.tsx` - использовать новый `useAuth`
   - `AuthStackNavigator.tsx` - Login, Register
   - `MainTabNavigator.tsx` - 4 таба (Arts, Warehouse, Refiling, Profile)
   - `ArtsStackNavigator.tsx` - экраны Arts
   - `WarehouseStackNavigator.tsx` - экраны Warehouse
   - Создать `RefilingStackNavigator.tsx` - новый
   - `ProfileStackNavigator.tsx` - профиль

3. **Обновить `App.tsx`:**

   ```typescript
   import './src/lib/apiClient'; // ⚠️ Первый импорт!
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

### Этап 5: Auth экраны (1-2 часа)

1. **Обновить `screens/auth/LoginScreen.tsx`:**
   - Использовать `useAuth` из `@/providers/AuthProvider`
   - Пример в `MOBILE_DEVELOPMENT_GUIDE.md`

2. **Обновить `screens/auth/RegisterScreen.tsx`:**
   - Использовать `useAuth` из `@/providers/AuthProvider`

### Этап 6: Arts экраны (2-3 часа)

1. **Обновить `screens/arts/ArtsListScreen.tsx`:**
   - Использовать `useArtsInfiniteQuery` из `@shared/modules/arts`
   - Передавать `artsServices.getArtsByParams` как DI
   - Пример в `MOBILE_DEVELOPMENT_GUIDE.md`

2. **Обновить `screens/arts/ArtDetailScreen.tsx`:**
   - Использовать `useOneArtQuery` из `@shared/modules/arts`
   - Использовать `useBtradeArtDataQuery`
   - Показывать позиции через `getPosesByArtikul`

3. **Создать компоненты:**
   - `components/cards/ArtCard.tsx`
   - `components/shared/SearchBar.tsx`

### Этап 7: Warehouse экраны (3-4 часа)

1. **Обновить `screens/warehouse/RowsScreen.tsx`:**
   - Использовать `rowsServices.getRows()`

2. **Обновить `screens/warehouse/RowDetailScreen.tsx`:**
   - Использовать `rowsServices.getRowById()`
   - Показывать паллеты через `palletsServices.getPalletsByRowId()`

3. **Обновить `screens/warehouse/PalletDetailScreen.tsx`:**
   - Использовать `palletsServices.getPalletById()`
   - Показывать позиции через `posesServices.getPosesByPalletId()`

4. **Обновить `screens/poses/PosesScreen.tsx`:**
   - CRUD операции с позициями

### Этап 8: Refiling экраны (2-3 часа)

1. **Создать `screens/refiling/AsksListScreen.tsx`:**
   - Date picker для выбора даты
   - Использовать `asksServices.getAsksByDate()`
   - Показывать статистику

2. **Создать `screens/refiling/AskDetailScreen.tsx`:**
   - Детали запиту
   - Actions (complete, reject)

3. **Создать `screens/refiling/DefsScreen.tsx`:**
   - Список дефіцитів
   - Группировка: critical, limited
   - Кнопка расчета (ADMIN+)

### Этап 9: Profile экран (30 мин)

1. **Обновить `screens/ProfileScreen.tsx`:**
   - Информация о пользователе
   - Редактирование
   - Logout

### Этап 10: Компоненты (2-3 часа)

Создать переиспользуемые компоненты:

- `components/cards/`
  - ArtCard.tsx
  - AskCard.tsx
  - PalletCard.tsx
  - PosCard.tsx
  - RowCard.tsx

- `components/shared/`
  - SearchBar.tsx
  - LoadingView.tsx
  - ErrorView.tsx
  - EmptyView.tsx
  - DatePicker.tsx
  - StatusBadge.tsx

- `components/forms/`
  - CreateAskForm.tsx
  - CreatePosForm.tsx
  - UpdatePosForm.tsx

### Этап 11: Тестирование (1-2 часа)

1. Проверить каждый модуль:
   - Auth (login/logout)
   - Arts (список, детали, поиск)
   - Warehouse (rows, pallets, poses)
   - Refiling (asks, defs)

2. Проверить права доступа:
   - USER видит только свои функции
   - ADMIN видит расширенные функции
   - PRIME видит все

3. Проверить обработку ошибок:
   - 401 → logout
   - 403 → alert
   - Network error → alert

## Быстрый чек-лист

### Перед началом

- [ ] Прочитал `QUICK_START.md`
- [ ] Прочитал `MOBILE_DEVELOPMENT_GUIDE.md`
- [ ] Понял структуру web приложения

### Инфраструктура

- [ ] Создан/обновлен `lib/apiClient.ts`
- [ ] Создан/обновлен `providers/AuthProvider.tsx`
- [ ] Проверен `providers/QueryProvider.tsx`
- [ ] Обновлен `App.tsx` с правильными импортами
- [ ] Обновлены типы навигации

### Навигация

- [ ] `RootNavigator` использует новый AuthProvider
- [ ] `AuthStackNavigator` настроен
- [ ] `MainTabNavigator` с 4 табами
- [ ] Stack навигаторы для каждого таба

### Экраны

- [ ] LoginScreen
- [ ] RegisterScreen
- [ ] ArtsListScreen
- [ ] ArtDetailScreen
- [ ] RowsScreen
- [ ] RowDetailScreen
- [ ] PalletDetailScreen
- [ ] AsksListScreen
- [ ] AskDetailScreen
- [ ] DefsScreen
- [ ] ProfileScreen

### Компоненты

- [ ] ArtCard
- [ ] AskCard
- [ ] PosCard
- [ ] PalletCard
- [ ] RowCard
- [ ] SearchBar
- [ ] LoadingView
- [ ] ErrorView
- [ ] StatusBadge

### Тестирование

- [ ] Auth работает
- [ ] API запросы проходят
- [ ] Навигация работает
- [ ] Данные отображаются
- [ ] Мутации работают
- [ ] Роли работают

## Файлы для удаления (после миграции)

```bash
# Старые файлы, которые не нужны
mobile/src/modules/auth/api/
mobile/src/modules/poses/api/
mobile/src/modules/pallets/api/
mobile/src/lib/apiClient.ts.old  # если создавал бэкап
mobile/src/providers/*.old       # если создавал бэкапы
```

## Команды для проверки

```bash
# Проверка что shared доступен
cd mobile
node -e "console.log(require.resolve('@shared/modules/arts'))"

# Запуск приложения
npm start

# Проверка линтера
npm run lint
```

## Помощь

**Если что-то не работает:**

1. **Storage not initialized**
   - Проверь что `import './src/lib/apiClient'` первый в App.tsx

2. **Cannot find module '@shared/...'**
   - Проверь `tsconfig.json` (paths)
   - Проверь `metro.config.js` (watchFolders)
   - Перезапусти Metro: `npm start -- --reset-cache`

3. **API ошибки**
   - Проверь что `SERVER_URL` корректный
   - Проверь что токен сохраняется в AsyncStorage
   - Включи Network logging

4. **TypeScript ошибки**
   - Проверь что зависимости установлены: `npm install`
   - Проверь версии в `package.json`

## Примерное время

- **Инфраструктура:** 2 часа
- **Auth модуль:** 1-2 часа
- **Arts модуль:** 2-3 часа
- **Warehouse модуль:** 3-4 часа
- **Refiling модуль:** 2-3 часа
- **Компоненты и полировка:** 2-3 часа
- **Тестирование:** 1-2 часа

**Итого:** 13-19 часов (2-3 дня активной работы)

## Ресурсы

- `QUICK_START.md` - начни отсюда
- `MOBILE_DEVELOPMENT_GUIDE.md` - примеры кода
- `API_REFERENCE.md` - справочник API
- `../shared/README.md` - shared пакет
- `../web/src/modules/` - примеры из web
