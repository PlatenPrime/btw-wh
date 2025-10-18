# Mobile API Reference

Быстрый справочник по использованию shared API в mobile приложении.

## Импорты

### Типы

```typescript
// Arts
import type { ArtDto, ArtsDto, BtradeArtInfoDto } from '@shared/modules/arts';

// Asks
import type { AskDto, AskStatus, GetAsksByDateResponse } from '@shared/modules/asks';

// Poses
import type { IPos, CreatePosDto, GetPosesByArtikulResponse } from '@shared/modules/poses';

// Pallets
import type { IPallet, PalletShortDto, CreatePalletDto } from '@shared/modules/pallets';

// Rows
import type { RowDto, CreateRowDto, UpdateRowDto } from '@shared/modules/rows';

// Defs
import type { Def, DeficitItem, DefsCalculationStatus } from '@shared/modules/defs';

// Auth
import type { User, RoleType, LoginData, RegisterData } from '@shared/modules/auth';
```

### Сервисы

```typescript
import {
  artsServices,
  asksServices,
  posesServices,
  palletsServices,
  rowsServices,
  defsServices,
  authServices,
} from '@/lib/apiClient';
```

### Хуки и утилиты

```typescript
// React Query хуки
import { useArtsQuery, useArtsInfiniteQuery, useOneArtQuery } from '@shared/modules/arts';

// Утилиты
import { useDebounce } from '@shared/hooks';
import { RoleType, hasRoleAccess, getRoleLabel } from '@shared/constants';
```

## Arts API

### Запросы

```typescript
// Список с пагинацией
const { data } = useArtsQuery({
  page: 1,
  limit: 20,
  search: 'текст поиска',
  filters: { zone: 'A' },
  getArtsByParams: artsServices.getArtsByParams,
});
// Результат: ArtsDto = { data: ArtDto[], total, page, totalPages }

// Infinite scroll
const { data, fetchNextPage, hasNextPage } = useArtsInfiniteQuery({
  limit: 20,
  search: 'текст',
  getArtsByParams: artsServices.getArtsByParams,
});
// Результат: InfiniteData<ArtsDto>

// Один артикул
const { data: art } = useOneArtQuery({
  artikul: 'ART123',
  getOneArtByArtikul: artsServices.getOneArtByArtikul,
});
// Результат: ArtDto

// Btrade данные
const { data: btrade } = useBtradeArtDataQuery({
  artikul: 'ART123',
  getBtradeArtDataByArtikul: artsServices.getBtradeArtDataByArtikul,
});
// Результат: BtradeArtInfoDto = { nameukr, price, quantity }
```

### Мутации

```typescript
// Обновить лимит
const mutation = useUpdateArtLimitMutation({
  artikul: { artikul: 'ART123' },
  updateArtLimitById: artsServices.updateArtLimitById,
});

await mutation.mutateAsync({
  id: 'artId',
  data: { limit: 100 },
});
```

## Asks API

### Запросы

```typescript
// Список по дате
const { data } = useQuery({
  queryKey: ['asks', 'by-date', date],
  queryFn: ({ signal }) => asksServices.getAsksByDate({ date, signal }),
});
// Результат: GetAsksByDateResponse = { data: AskDto[], count, newCount, ... }

// Один запит
const { data } = useQuery({
  queryKey: ['asks', id],
  queryFn: () => asksServices.getAskById(id),
});
// Результат: GetAskByIdResponse = { data: AskDto }
```

### Мутации

```typescript
// Создать
const create = useMutation({
  mutationFn: (data: CreateAskRequest) => asksServices.createAsk(data),
});

await create.mutateAsync({
  artikul: 'ART123',
  nameukr: 'Назва',
  quant: '10',
  com: 'Коментар',
  askerId: user._id,
});

// Обновить
await asksServices.updateAskById(id, { quant: 20 });

// Виконати
await asksServices.completeAskById(id, solverId);

// Відхилити
await asksServices.rejectAskById(id, solverId);

// Видалити
await asksServices.deleteAskById(id);

// Додати action
await asksServices.updateAskActionsById(id, {
  action: 'Дія виконана',
  userId: user._id,
});
```

## Poses API

### Запросы

```typescript
// Все позиции
const { data } = useQuery({
  queryKey: ['poses'],
  queryFn: ({ signal }) => posesServices.getAllPoses({}, signal),
});
// Результат: PosListResponse = { data: IPos[], total, page, totalPages }

// По паллете
const { data } = useQuery({
  queryKey: ['poses', 'by-pallet', palletId],
  queryFn: ({ signal }) => posesServices.getPosesByPalletId(palletId, signal),
});
// Результат: IPos[]

// По ряду
const { data } = useQuery({
  queryKey: ['poses', 'by-row', rowId],
  queryFn: ({ signal }) => posesServices.getPosesByRowId(rowId, signal),
});
// Результат: IPos[]

// По артикулу (группировка по складам)
const { data } = useQuery({
  queryKey: ['poses', 'by-artikul', artikul],
  queryFn: ({ signal }) => posesServices.getPosesByArtikul(artikul, signal),
});
// Результат: GetPosesByArtikulResponse = {
//   total, totalQuant, totalBoxes,
//   pogrebi: { poses: IPos[], quant, boxes },
//   merezhi: { poses: IPos[], quant, boxes }
// }
```

### Мутации

```typescript
// Создать позицию
await posesServices.createPos({
  palletId: 'pallet123',
  rowId: 'row123',
  artikul: 'ART123',
  nameukr: 'Назва',
  quant: 10,
  boxes: 2,
  sklad: 'pogrebi',
  comment: 'Коментар',
});

// Массовое создание
await posesServices.bulkCreatePoses({
  poses: [
    { palletId, rowId, artikul: 'ART1', quant: 10, boxes: 1 },
    { palletId, rowId, artikul: 'ART2', quant: 20, boxes: 2 },
  ],
});

// Обновить
await posesServices.updatePos(posId, { quant: 15, boxes: 3 });

// Удалить
await posesServices.deletePos(posId);
```

## Pallets API

### Запросы

```typescript
// Все паллеты
const { data } = useQuery({
  queryKey: ['pallets'],
  queryFn: ({ signal }) => palletsServices.getAllPallets(signal),
});
// Результат: IPallet[]

// По ID
const { data } = useQuery({
  queryKey: ['pallet', palletId],
  queryFn: ({ signal }) => palletsServices.getPalletById(palletId, signal),
});
// Результат: IPallet

// По ряду
const { data } = useQuery({
  queryKey: ['pallets', 'by-row', rowId],
  queryFn: ({ signal }) => palletsServices.getPalletsByRowId(rowId, signal),
});
// Результат: PalletShortDto[]

// Пустые паллеты
const { data } = useQuery({
  queryKey: ['pallets', 'empty'],
  queryFn: ({ signal }) => palletsServices.getEmptyPallets(signal),
});
// Результат: IPallet[]
```

### Мутации

```typescript
// Создать
await palletsServices.createPallet({
  title: 'A-01',
  rowData: { _id: rowId, title: 'Row A' },
  sector: 'sector1',
  isDef: false,
});

// Обновить
await palletsServices.updatePallet(palletId, {
  title: 'A-02',
  sector: 'sector2',
});

// Удалить
await palletsServices.deletePallet(palletId);

// Очистить (удалить все позиции)
await palletsServices.deletePalletPoses(palletId);

// Удалить пустые позиции
await palletsServices.deletePalletEmptyPoses(palletId);

// Переместить позиции
await palletsServices.movePalletPoses(sourcePalletId, targetPalletId);
```

## Rows API

### Запросы

```typescript
// Все ряды
const { data } = useQuery({
  queryKey: ['rows'],
  queryFn: ({ signal }) => rowsServices.getRows({ signal }),
});
// Результат: RowDto[]

// По ID
const { data } = useQuery({
  queryKey: ['row', rowId],
  queryFn: ({ signal }) => rowsServices.getRowById(rowId, signal),
});
// Результат: RowDto

// По title
const { data } = useQuery({
  queryKey: ['row', 'by-title', title],
  queryFn: ({ signal }) => rowsServices.getRowByTitle(title, signal),
});
// Результат: RowDto
```

### Мутации

```typescript
// Создать
await rowsServices.createRow({ title: 'Row A' });

// Обновить
await rowsServices.updateRow(rowId, { title: 'Row B' });

// Удалить
await rowsServices.deleteRow(rowId);
```

## Defs API

### Запросы

```typescript
// Последние дефициты
const { data } = useQuery({
  queryKey: ['defs', 'latest'],
  queryFn: () => defsServices.getLatestDefs(),
});
// Результат: GetLatestDefsResponse = {
//   success: true,
//   data: Def {
//     result: { [artikul]: DeficitItem },
//     total, totalCriticalDefs, totalLimitDefs
//   }
// }

// Статус расчета (с polling)
const { data, refetch } = useQuery({
  queryKey: ['defs', 'calculation-status'],
  queryFn: () => defsServices.getCalculationStatus(),
  refetchInterval: (data) => (data?.data.isRunning ? 5000 : false), // Poll каждые 5 сек
});
// Результат: DefsCalculationStatusResponse = {
//   success: true,
//   data: { isRunning, progress, currentStep, ... }
// }
```

### Мутации

```typescript
// Запустить расчет (только ADMIN+)
await defsServices.calculateDefs();
// Fire-and-forget, проверяй статус через getCalculationStatus
```

## Auth API

### Использование через AuthProvider

```typescript
import { useAuth } from '@/providers/AuthProvider';

const { user, token, login, register, logout, hasRole } = useAuth();

// Login
await login('username', 'password');

// Register
await register({
  username: 'newuser',
  password: 'pass123',
  fullname: 'Іван Іванов',
  telegram: '@ivan',
});

// Logout
await logout();

// Update profile
await updateUser({
  fullname: "Нове ім'я",
  telegram: '@newtelegram',
});
```

## Типы данных

### ArtDto

```typescript
{
  _id: string;
  artikul: string;
  nameukr: string;
  namerus: string;
  zone: string;
  limit?: number;
  marker?: string;
  btradeStock: {
    value: number;
    date: string;
    _id: string;
  };
}
```

### AskDto

```typescript
{
  _id: string;
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  asker: string;
  askerData: {
    _id: string;
    fullname: string;
    telegram?: string;
    photo?: string;
  };
  solver: string;
  solverData?: { ... };
  status: 'new' | 'completed' | 'rejected' | 'fail' | 'solved';
  actions: string[];
  createdAt: string;
  updatedAt: string;
}
```

### IPos

```typescript
{
  _id: string;
  pallet: string;
  row: string;
  palletData: { _id, title, sector? };
  rowData: { _id, title };
  palletTitle: string;
  rowTitle: string;
  artikul: string;
  nameukr?: string;
  quant: number;
  boxes: number;
  date?: string;
  sklad: string; // 'pogrebi' | 'merezhi'
  comment: string;
  limit?: number;
}
```

### IPallet

```typescript
{
  _id: string;
  title: string;
  row: string;
  rowData: { _id, title };
  poses: IPos[];
  sector?: string;
  isDef: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### RowDto

```typescript
{
  _id: string;
  title: string;
  pallets: PalletShortDto[];
  createdAt: string;
  updatedAt: string;
}
```

### DeficitItem

```typescript
{
  nameukr: string;
  quant: number;           // Текущий остаток
  sharikQuant: number;     // Остаток по Sharik
  difQuant: number;        // Разница
  defLimit: number;        // Лимит + остаток
  status: 'limited' | 'critical';
  existingAsk: {           // Если уже есть запит
    _id: string;
    status: string;
    createdAt: string;
    askerName: string;
  } | null;
}
```

## Query Keys

Используй эти ключи для invalidation:

```typescript
// Arts
['arts', { page, limit, search, ...filters }][('art', { artikul })][('btradeArtInfo', { artikul })][
  // Asks
  ('asks', 'by-date', { date })
][('asks', id)][
  // Poses
  ('poses', params)
][('poses', { by: 'pallet', palletId })][('poses', { by: 'row', rowId })][
  ('poses', { by: 'artikul', artikul })
][
  // Pallets
  ('pallets', { option: 'all' })
][('pallets', { option: 'empty' })][('pallets', { rowId })][('pallet', { id })][
  // Rows
  'rows'
][('row', { rowId })][('row', { rowTitle })][
  // Defs
  ('defs', 'latest')
][('defs', 'calculation-status')];
```

## Invalidation примеры

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// После создания позиции
queryClient.invalidateQueries({ queryKey: ['poses'] });
queryClient.invalidateQueries({ queryKey: ['poses', { by: 'pallet', palletId }] });
queryClient.invalidateQueries({ queryKey: ['pallets'] });

// После создания запиту
queryClient.invalidateQueries({ queryKey: ['asks'] });
queryClient.invalidateQueries({ queryKey: ['defs', 'latest'] }); // Обновить existingAsk

// После обновления артикула
queryClient.invalidateQueries({ queryKey: ['art', { artikul }] });
queryClient.invalidateQueries({ queryKey: ['arts'] });
```

## Роли

```typescript
import { RoleType } from '@shared/constants';

// Роли (иерархия)
RoleType.PRIME; // 3 - максимальные права
RoleType.ADMIN; // 2 - администратор
RoleType.USER; // 1 - обычный пользователь

// Проверка
import { useAuth } from '@/providers/AuthProvider';

const { hasRole, hasAnyRole } = useAuth();

hasRole(RoleType.ADMIN); // true для ADMIN и PRIME
hasRole(RoleType.USER); // true для всех

hasAnyRole([RoleType.ADMIN, RoleType.PRIME]); // true для админов
```

## Права доступа

| Действие              | USER | ADMIN | PRIME |
| --------------------- | ---- | ----- | ----- |
| Создать Ask           | ✅   | ✅    | ✅    |
| Удалить свой Ask      | ✅   | ✅    | ✅    |
| Удалить чужой Ask     | ❌   | ✅    | ✅    |
| Complete/Reject Ask   | ❌   | ✅    | ✅    |
| Создать Pos           | ❌   | ✅    | ✅    |
| Удалить Pos           | ❌   | ✅    | ✅    |
| Создать Pallet        | ❌   | ✅    | ✅    |
| Удалить Pallet        | ❌   | ❌    | ✅    |
| Создать Row           | ❌   | ✅    | ✅    |
| Удалить Row           | ❌   | ❌    | ✅    |
| Расчет дефіцитів      | ❌   | ✅    | ✅    |
| Редактировать артикул | ❌   | ✅    | ✅    |

## Статусы

### Ask Status

```typescript
type AskStatus = 'new' | 'completed' | 'rejected' | 'fail' | 'solved';

const statusLabels = {
  new: 'Новий',
  completed: 'Виконано',
  rejected: 'Відхилено',
  fail: 'Провал',
  solved: 'Вирішено',
};
```

### Deficit Status

```typescript
type DeficitStatus = 'critical' | 'limited';

// critical: sharikQuant <= quant (критичний дефіцит)
// limited: sharikQuant <= defLimit але > quant (в межах ліміту)
```

### Sklad (склад)

```typescript
type Sklad = 'pogrebi' | 'merezhi';

const skladLabels = {
  pogrebi: 'Погреби',
  merezhi: 'Мережі',
};
```

## Error Handling

```typescript
import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';

const mutation = useMutation({
  mutationFn: someService,
  onError: (error: Error) => {
    // Показать alert с ошибкой
    Alert.alert('Помилка', error.message);
  },
  onSuccess: (data) => {
    // Показать успех
    Alert.alert('Успіх', 'Операція виконана');
  },
});
```

## Best Practices

### 1. Всегда используй React Query

```typescript
// ✅ Правильно
const { data } = useQuery({
  queryKey: ['arts'],
  queryFn: () => artsServices.getArtsByParams({ page: 1, limit: 20 }),
});

// ❌ Неправильно
const [data, setData] = useState();
useEffect(() => {
  artsServices.getArtsByParams(...).then(setData);
}, []);
```

### 2. Используй debounce для поиска

```typescript
import { useDebounce } from '@shared/hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

const { data } = useQuery({
  queryKey: ['arts', debouncedSearch],
  queryFn: () => artsServices.getArtsByParams({ search: debouncedSearch, ... }),
});
```

### 3. Invalidate кеш после мутаций

```typescript
const mutation = useMutation({
  mutationFn: createPos,
  onSuccess: () => {
    // Инвалидировать связанные запросы
    queryClient.invalidateQueries({ queryKey: ['poses'] });
    queryClient.invalidateQueries({ queryKey: ['pallets'] });
  },
});
```

### 4. Обрабатывай все состояния

```typescript
const { data, isLoading, error, isRefetching } = useQuery(...);

if (isLoading) return <LoadingView />;
if (error) return <ErrorView error={error} />;
if (!data) return <EmptyView />;

return <DataView data={data} />;
```

### 5. Используй TypeScript типы

```typescript
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ArtsStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ArtsStackParamList, 'ArtDetail'>;

export function ArtDetailScreen({ route, navigation }: Props) {
  const { artikul } = route.params; // Type-safe!
  // ...
}
```

## Полезные snippets

### Loading Indicator

```typescript
import { View, ActivityIndicator, Text } from 'react-native';

export function LoadingView({ message = 'Завантаження...' }) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#0ea5e9" />
      <Text className="mt-2 text-gray-600">{message}</Text>
    </View>
  );
}
```

### Error View

```typescript
import { View, Text, TouchableOpacity } from 'react-native';

export function ErrorView({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-center text-red-500">Помилка: {error.message}</Text>
      {onRetry && (
        <TouchableOpacity
          className="mt-4 rounded bg-blue-500 px-4 py-2"
          onPress={onRetry}
        >
          <Text className="text-white">Спробувати ще раз</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
```

### Empty View

```typescript
import { View, Text } from 'react-native';

export function EmptyView({ message = 'Дані відсутні' }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-500">{message}</Text>
    </View>
  );
}
```

## Ссылки

- Полное руководство: `MOBILE_DEVELOPMENT_GUIDE.md`
- Быстрый старт: `QUICK_START.md`
- Shared API: `../shared/README.md`
- React Navigation: https://reactnavigation.org/
- React Query: https://tanstack.com/query/latest
