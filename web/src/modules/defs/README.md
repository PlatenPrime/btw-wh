# Модуль Defs - Расчет дефицитов

## Описание

Модуль `defs` предназначен для автоматического расчета дефицитов товаров на складе. Система сравнивает текущие остатки с данными с сайта sharik.ua и определяет товары, которые требуют пополнения.

## Основные функции

### 🔄 Расчет дефицитов

- Получение данных о складских остатках
- Сравнение с данными Sharik
- Фильтрация по лимитам товаров
- Автоматическое сохранение результатов в БД

### 💾 Хранение данных

- Сохранение результатов расчета в MongoDB
- Автоматический подсчет статистики
- История расчетов с временными метками

## API Endpoints

### POST `/api/defs/calculate`

Запускает ручной расчет дефицитов и сохраняет результат в базу данных.

**Запрос:**

```http
POST /api/defs/calculate

```

**Ответ при успехе (201):**

```json
{
  "success": true,
  "message": "Deficit calculation completed and saved successfully",
  "data": {
    "total": 23,
    "totalCriticalDefs": 15,
    "totalLimitDefs": 8,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Ответ при ошибке (500):**

```json
{
  "success": false,
  "message": "Failed to calculate and save deficits",
  "error": "Описание ошибки"
}
```

### GET `/api/defs/latest`

Получает последний актуальный результат расчета дефицитов.

**Запрос:**

```http
GET /api/defs/latest
Authorization: Bearer <token>
```

**Ответ при успехе (200):**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6789012345",
    "result": {
      "1102-3101": {
        "nameukr": "1102-3101 Кулька І 12\"/01 Пастель білий \"МАКСІ\",500од",
        "quant": 115000,
        "sharikQuant": 49500,
        "difQuant": -65500,
        "defLimit": 115500
      }
    },
    "total": 1,
    "totalCriticalDefs": 1,
    "totalLimitDefs": 0,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Ответ при отсутствии данных (404):**

```json
{
  "success": false,
  "message": "No deficit calculations found"
}
```

## Структура данных

### IDeficitItem

Интерфейс для данных о дефиците по артикулу:

```typescript
interface IDeficitItem {
  nameukr: string; // Название товара на украинском
  quant: number; // Текущий остаток на складе
  sharikQuant: number; // Остаток по данным Sharik
  difQuant: number; // Разница (sharikQuant - quant)
  defLimit: number; // Сумма лимита артикула и quant
}
```

### IDefcalc

Интерфейс для документа расчета дефицитов:

```typescript
interface IDefcalc {
  result: IDeficitCalculationResult; // Объект с дефицитами по артикулам
  total: number; // Общее количество найденных дефицитов
  totalCriticalDefs: number; // Критические дефициты (sharikQuant <= quant)
  totalLimitDefs: number; // Дефициты в лимите (sharikQuant <= defLimit но > quant)
  createdAt: Date; // Дата создания
  updatedAt: Date; // Дата обновления
}
```

## Логика фильтрации дефицитов

Система определяет тип дефицита по следующим условиям:

1. **Критический дефицит** - `sharikQuant <= quant` (остаток на сайте меньше или равен остатку на складе)
2. **Дефицит в лимите** - `sharikQuant <= defLimit` но `sharikQuant > quant` (остаток на сайте меньше лимита, но больше остатка на складе)
3. **`defLimit`** - сумма лимита артикула и `quant` (когда `sharikQuant` пересекает это значение, дефицит становится в лимите)

### ❌ Ошибка расчета

```
❌ Ошибка при расчете дефицитов

Ошибка: Описание ошибки
```

## Интеграция с другими модулями

### Модуль Arts

- Получение лимитов товаров (`getArtLimits`)
- Использование данных об артикулах

### Модуль Poses

- Получение складских остатков (`getPogrebiDefStocks`)
- Интеграция с данными Sharik (`getSharikStocks`)

### Модуль Comps

- Получение данных с сайта sharik.ua (`getSharikData`)

## Примеры использования для фронтенда

### Получение актуальных дефицитов

```typescript
const response = await fetch("/api/defs/latest", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const { success, data } = await response.json();

if (success && data) {
  const deficits = Object.entries(data.result).map(([artikul, item]) => ({
    artikul,
    name: item.nameukr,
    currentStock: item.quant,
    requiredStock: item.sharikQuant,
    deficit: Math.abs(item.difQuant),
    defLimit: item.defLimit,
    isCritical: item.sharikQuant <= item.quant,
    isInLimit:
      item.sharikQuant <= item.defLimit && item.sharikQuant > item.quant,
  }));
}
```

### Запуск ручного расчета

```typescript
const response = await fetch("/api/defs/calculate", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const result = await response.json();
console.log(`Найдено дефицитов: ${result.data.total}`);
console.log(`Критических: ${result.data.totalCriticalDefs}`);
console.log(`В лимите: ${result.data.totalLimitDefs}`);
```

### Отображение статистики

```typescript
// Получение статистики по дефицитам
const getDeficitStats = (data: IDefcalc) => {
  return {
    total: data.total,
    deficits: data.total,
    critical: data.totalCriticalDefs,
    nearLimit: data.totalLimitDefs,
  };
};
```

## Обработка ошибок

Все endpoints возвращают стандартизированные ответы с полями:

- `success: boolean` - статус выполнения
- `message: string` - описание результата
- `data?: any` - данные ответа (при успехе)
- `error?: string` - описание ошибки (при неудаче)

## Безопасность

- Все endpoints требуют аутентификации (JWT токен)
- Валидация входящих данных
- Обработка исключений и логирование ошибок
- Защита от SQL-инъекций через Mongoose ODM

## Производительность

- Задержка 100ms между запросами к Sharik для предотвращения блокировки
- Логирование прогресса каждые 10 артикулов
- Эффективная фильтрация дефицитов
- Автоматический подсчет статистики через Mongoose middleware
