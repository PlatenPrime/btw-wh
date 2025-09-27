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
    "totalItems": 150,
    "totalDeficits": 23,
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
      "ART001": {
        "nameukr": "Название товара",
        "quant": 5,
        "boxes": 1,
        "sharikQuant": 15,
        "difQuant": 10,
        "limit": 20
      },
      "ART002": {
        "nameukr": "Другой товар",
        "quant": 0,
        "boxes": 0,
        "sharikQuant": 8,
        "difQuant": -5,
        "limit": 10
      }
    },
    "totalDeficits": 1,
    "totalItems": 2,
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
  nameukr?: string; // Название товара на украинском
  quant: number; // Текущий остаток на складе
  boxes: number; // Количество коробок
  sharikQuant: number; // Остаток по данным Sharik
  difQuant: number; // Разница (sharikQuant - quant)
  limit?: number; // Минимальный лимит товара
}
```

### IDefcalc

Интерфейс для документа расчета дефицитов:

```typescript
interface IDefcalc {
  result: IDeficitCalculationResult; // Объект с дефицитами по артикулам
  totalDeficits: number; // Общее количество дефицитных товаров
  totalItems: number; // Общее количество обработанных товаров
  createdAt: Date; // Дата создания
  updatedAt: Date; // Дата обновления
}
```

## Логика фильтрации дефицитов

Система определяет товар как дефицитный, если выполняется одно из условий:

1. **`difQuant <= 0`** - реальный дефицит (остаток на складе меньше или равен нулю)
2. **`quant <= limit`** - приближение к лимиту (текущий остаток меньше или равен установленному лимиту)

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
  const deficits = Object.entries(data.result)
    .filter(([artikul, item]) => item.difQuant <= 0)
    .map(([artikul, item]) => ({
      artikul,
      name: item.nameukr,
      currentStock: item.quant,
      requiredStock: item.sharikQuant,
      deficit: Math.abs(item.difQuant),
      limit: item.limit,
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
console.log(`Найдено дефицитов: ${result.data.totalDeficits}`);
```

### Отображение статистики

```typescript
// Получение статистики по дефицитам
const getDeficitStats = (data: IDefcalc) => {
  const items = Object.values(data.result);

  return {
    total: data.totalItems,
    deficits: data.totalDeficits,
    critical: items.filter((item) => item.difQuant <= 0).length,
    nearLimit: items.filter(
      (item) => item.difQuant > 0 && item.limit && item.quant <= item.limit
    ).length,
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
