# Задача: Удаление артикулов без последнего актуального маркера

## Описание задачи

Необходимо реализовать функционал для удаления всех артикулов, которые не имеют последнего актуального маркера. Маркер представляет собой дату обновления артикула в формате `YYYYMMDD` (например, `20251123` для 23 ноября 2025 года).

## API Endpoint

### Удаление артикулов без последнего маркера

- **URL:** `DELETE /api/arts/without-latest-marker`
- **Метод:** `DELETE`
- **Доступ:** Только для пользователей с ролью **PRIME**
- **Требует авторизации:** Да (Bearer token)

## Описание работы

Эндпоинт находит максимальный маркер среди всех артикулов в базе данных и удаляет все артикулы, у которых:
- Маркер отсутствует (`null`, `undefined`, пустая строка)
- Маркер меньше максимального найденного маркера

**⚠️ ВАЖНО:** Операция необратима — удаленные артикулы нельзя восстановить.

## Формат запроса

### Headers

```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### Body

Тело запроса не требуется (пустое).

## Формат ответа

### Успешный ответ (200 OK)

```json
{
  "message": "Arts without latest marker deleted successfully",
  "result": {
    "deletedCount": 42,
    "latestMarker": "20251123"
  }
}
```

### Поля ответа

| Поле | Тип | Описание |
|------|-----|----------|
| `message` | `string` | Сообщение об успешном выполнении |
| `result.deletedCount` | `number` | Количество удаленных артикулов |
| `result.latestMarker` | `string \| null` | Максимальный маркер, найденный в базе (null, если маркеров нет) |

## Обработка ошибок

### 401 Unauthorized

Пользователь не авторизован или токен отсутствует/невалиден.

```json
{
  "message": "Не авторизовано: данные пользователя отсутствуют",
  "code": "USER_DATA_MISSING"
}
```

### 403 Forbidden

Недостаточно прав доступа (требуется роль PRIME).

```json
{
  "message": "Доступ запрещен: недостаточно прав",
  "code": "INSUFFICIENT_PERMISSIONS",
  "requiredRoles": ["PRIME"],
  "userRole": "ADMIN"
}
```

### 500 Internal Server Error

Ошибка сервера.

```json
{
  "message": "Server error",
  "error": {
    /* Детали ошибки (только в development режиме) */
  }
}
```

## Примеры реализации

### JavaScript (Vanilla)

```javascript
/**
 * Удаляет все артикулы без последнего актуального маркера
 * @param {string} token - JWT токен пользователя
 * @returns {Promise<{deletedCount: number, latestMarker: string|null}>}
 */
async function deleteArtsWithoutLatestMarker(token) {
  try {
    const response = await fetch('/api/arts/without-latest-marker', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      
      // Обработка различных ошибок
      if (response.status === 401) {
        throw new Error('Необходима авторизация');
      } else if (response.status === 403) {
        throw new Error('Недостаточно прав. Требуется роль PRIME.');
      } else {
        throw new Error(error.message || 'Ошибка при удалении артикулов');
      }
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Ошибка при удалении артикулов:', error);
    throw error;
  }
}

// Использование
try {
  const result = await deleteArtsWithoutLatestMarker(userToken);
  console.log(`Удалено артикулов: ${result.deletedCount}`);
  console.log(`Последний маркер: ${result.latestMarker}`);
  
  // Показать уведомление пользователю
  alert(`Успешно удалено ${result.deletedCount} артикулов`);
} catch (error) {
  alert(`Ошибка: ${error.message}`);
}
```

### React с использованием axios

```typescript
import axios from 'axios';

interface DeleteArtsResult {
  deletedCount: number;
  latestMarker: string | null;
}

interface DeleteArtsResponse {
  message: string;
  result: DeleteArtsResult;
}

/**
 * Удаляет все артикулы без последнего актуального маркера
 */
export const deleteArtsWithoutLatestMarker = async (
  token: string
): Promise<DeleteArtsResult> => {
  try {
    const response = await axios.delete<DeleteArtsResponse>(
      '/api/arts/without-latest-marker',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Необходима авторизация');
      } else if (error.response?.status === 403) {
        throw new Error('Недостаточно прав. Требуется роль PRIME.');
      } else if (error.response?.status === 500) {
        throw new Error('Ошибка сервера при удалении артикулов');
      }
    }
    throw error;
  }
};

// Использование в компоненте
const DeleteArtsButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const token = useAuthToken(); // ваш хук для получения токена

  const handleDelete = async () => {
    // Подтверждение перед удалением
    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить все артикулы без последнего маркера? ' +
      'Это действие необратимо!'
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      const result = await deleteArtsWithoutLatestMarker(token);
      
      // Показать результат
      alert(
        `Успешно удалено ${result.deletedCount} артикулов.\n` +
        `Последний маркер: ${result.latestMarker || 'не найден'}`
      );
      
      // Обновить список артикулов, если нужно
      // refreshArtsList();
    } catch (error) {
      alert(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="delete-button"
    >
      {loading ? 'Удаление...' : 'Удалить неактуальные артикулы'}
    </button>
  );
};
```

### React с использованием React Query

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deleteArtsWithoutLatestMarker = async (token: string) => {
  const response = await axios.delete(
    '/api/arts/without-latest-marker',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.result;
};

export const useDeleteArtsWithoutLatestMarker = () => {
  const queryClient = useQueryClient();
  const token = useAuthToken();

  return useMutation({
    mutationFn: () => deleteArtsWithoutLatestMarker(token),
    onSuccess: (data) => {
      // Инвалидировать кеш артикулов для обновления списка
      queryClient.invalidateQueries({ queryKey: ['arts'] });
      
      // Показать уведомление
      toast.success(
        `Удалено ${data.deletedCount} артикулов. ` +
        `Последний маркер: ${data.latestMarker || 'не найден'}`
      );
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        toast.error('Недостаточно прав. Требуется роль PRIME.');
      } else {
        toast.error('Ошибка при удалении артикулов');
      }
    },
  });
};

// Использование в компоненте
const DeleteArtsButton: React.FC = () => {
  const { mutate, isPending } = useDeleteArtsWithoutLatestMarker();

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить все артикулы без последнего маркера? ' +
      'Это действие необратимо!'
    );

    if (confirmed) {
      mutate();
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Удаление...' : 'Удалить неактуальные артикулы'}
    </button>
  );
};
```

## Рекомендации по реализации UI

1. **Подтверждение действия:** Обязательно показывайте диалог подтверждения перед удалением, так как операция необратима.

2. **Индикатор загрузки:** Показывайте состояние загрузки во время выполнения запроса.

3. **Обработка ошибок:** Обрабатывайте все возможные ошибки (401, 403, 500) и показывайте понятные сообщения пользователю.

4. **Обновление данных:** После успешного удаления обновите список артикулов на странице.

5. **Права доступа:** Показывайте кнопку/функцию удаления только пользователям с ролью PRIME.

6. **Отображение результата:** После успешного удаления покажите количество удаленных артикулов и значение последнего маркера.

## Пример UI компонента (React + TypeScript)

```typescript
import React, { useState } from 'react';
import { useDeleteArtsWithoutLatestMarker } from './hooks/useDeleteArtsWithoutLatestMarker';

export const DeleteArtsWithoutLatestMarkerButton: React.FC = () => {
  const { mutate, isPending } = useDeleteArtsWithoutLatestMarker();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        setShowConfirm(false);
        // Показать результат
      },
    });
  };

  if (showConfirm) {
    return (
      <div className="confirm-dialog">
        <p>
          Вы уверены, что хотите удалить все артикулы без последнего актуального маркера?
        </p>
        <p className="warning">⚠️ Это действие необратимо!</p>
        <div className="buttons">
          <button onClick={handleConfirm} disabled={isPending}>
            {isPending ? 'Удаление...' : 'Да, удалить'}
          </button>
          <button onClick={() => setShowConfirm(false)} disabled={isPending}>
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setShowConfirm(true)}
      className="delete-button"
    >
      Удалить неактуальные артикулы
    </button>
  );
};
```

## Дополнительная информация

### О маркерах

- Маркер имеет формат `YYYYMMDD` (например, `20251123` для 23 ноября 2025)
- Маркер автоматически устанавливается при загрузке артикулов через `POST /api/arts/upsert`, если не указан явно
- Маркер можно установить вручную при загрузке артикулов

### Логика работы

1. Система находит максимальный маркер среди всех артикулов в базе
2. Удаляются все артикулы, у которых маркер:
   - Отсутствует (null, undefined, "")
   - Меньше найденного максимального маркера
3. Артикулы с максимальным маркером остаются в базе

### Тестирование

Рекомендуется протестировать:
- Успешное удаление артикулов
- Обработку ошибки 401 (неавторизованный пользователь)
- Обработку ошибки 403 (пользователь без роли PRIME)
- Обработку случая, когда нет артикулов для удаления
- Обновление UI после успешного удаления

---

**Дата создания:** 2025-01-XX  
**Версия API:** 1.0  
**Контакт:** Backend Team

