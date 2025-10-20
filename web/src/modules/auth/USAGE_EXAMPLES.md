# 🎯 Примеры использования системы авторизации

## 📚 Содержание

1. [Базовое использование](#базовое-использование)
2. [Защита роутов](#защита-роутов)
3. [Условный рендеринг](#условный-рендеринг)
4. [Хуки](#хуки)
5. [Проверка разрешений](#проверка-разрешений)

---

## Базовое использование

### Использование в компонентах

```tsx
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Будь ласка, увійдіть</p>;
  }

  return (
    <div>
      <h1>Привіт, {user?.fullname}!</h1>
      <p>Роль: {user?.role}</p>
      <button onClick={logout}>Вийти</button>
    </div>
  );
}
```

---

## Защита роутов

### В router.tsx

```tsx
import { RoleType } from "@/constants/roles";
import { ProtectedRoute } from "@/modules/auth/components";

// Доступно всем авторизованным
{
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
}

// Доступно только ADMIN и PRIME
{
  path: "/admin",
  element: (
    <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
      <AdminPanel />
    </ProtectedRoute>
  ),
}

// Доступно ТОЛЬКО PRIME (точное совпадение)
{
  path: "/super-admin",
  element: (
    <ProtectedRoute allowedRoles={[RoleType.PRIME]} exactMatch>
      <SuperAdminPanel />
    </ProtectedRoute>
  ),
}
```

---

## Условный рендеринг

### RoleGuard - по ролям

```tsx
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Показать только админам и выше */}
      <RoleGuard allowedRoles={[RoleType.ADMIN]}>
        <button>Видалити все</button>
      </RoleGuard>

      {/* Показать только PRIME */}
      <RoleGuard allowedRoles={[RoleType.PRIME]}>
        <button>Критична операція</button>
      </RoleGuard>

      {/* С fallback */}
      <RoleGuard
        allowedRoles={[RoleType.ADMIN]}
        fallback={<p>Тільки для адміністраторів</p>}
      >
        <AdminSettings />
      </RoleGuard>
    </div>
  );
}
```

### PermissionGuard - по разрешениям

```tsx
import { PermissionGuard } from "@/modules/auth/components";

function ArtsPage() {
  return (
    <div>
      <h1>Артикули</h1>

      {/* Показать если есть право edit:arts */}
      <PermissionGuard permission="edit:arts">
        <button>Редагувати артикул</button>
      </PermissionGuard>

      {/* Показать если есть хотя бы одно из прав */}
      <PermissionGuard permissions={["edit:arts", "create:arts"]}>
        <button>Управління артикулами</button>
      </PermissionGuard>

      {/* Показать если есть ВСЕ права */}
      <PermissionGuard
        permissions={["edit:pallets", "delete:pallets"]}
        requireAll
      >
        <button>Повне управління палетами</button>
      </PermissionGuard>
    </div>
  );
}
```

### ResourceOwnerGuard - проверка владельца

```tsx
import { ResourceOwnerGuard } from "@/modules/auth/components";

function AskCard({ ask }) {
  return (
    <div>
      <h3>{ask.title}</h3>

      {/* Показать кнопку редактирования владельцу или админу */}
      <ResourceOwnerGuard ownerId={ask.asker} action="edit">
        <button>Редагувати</button>
      </ResourceOwnerGuard>

      {/* Показать кнопку удаления владельцу или админу */}
      <ResourceOwnerGuard ownerId={ask.asker} action="delete">
        <button>Видалити</button>
      </ResourceOwnerGuard>
    </div>
  );
}
```

---

## Хуки

### useRole - работа с ролями

```tsx
import { useRole } from "@/modules/auth/hooks";

function Header() {
  const { currentRole, isAdmin, isPrime, hasRole } = useRole();

  return (
    <header>
      <p>Роль: {currentRole}</p>

      {isAdmin && <Link to="/admin">Панель адміна</Link>}

      {isPrime && <Link to="/super-admin">Суперадмін</Link>}

      {hasRole(RoleType.ADMIN) && <button>Управління користувачами</button>}
    </header>
  );
}
```

### usePermission - проверка разрешений

```tsx
import { usePermission } from "@/modules/auth/hooks";

function AsksTable({ asks }) {
  const { can, canEditResource, canDeleteResource } = usePermission();

  return (
    <table>
      {asks.map((ask) => (
        <tr key={ask._id}>
          <td>{ask.title}</td>
          <td>
            {canEditResource(ask.asker) && <button>Редагувати</button>}

            {canDeleteResource(ask.asker) && <button>Видалити</button>}

            {can("complete:asks") && <button>Завершити</button>}
          </td>
        </tr>
      ))}
    </table>
  );
}
```

### useAuth - полный контроль

```tsx
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

function ProfileSettings() {
  const {
    user,
    token,
    isLoading,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    updateUser,
    logout,
  } = useAuth();

  // Проверка роли
  const canManageUsers = hasRole(RoleType.ADMIN);

  // Проверка хотя бы одной роли
  const canEdit = hasAnyRole([RoleType.ADMIN, RoleType.PRIME]);

  const handleUpdate = async (data) => {
    await updateUser(data);
  };

  return (
    <div>
      {isLoading ? (
        <p>Завантаження...</p>
      ) : (
        <>
          <h1>{user?.fullname}</h1>
          {canManageUsers && <button>Управління користувачами</button>}
          {canEdit && <button onClick={handleUpdate}>Оновити профіль</button>}
        </>
      )}
    </div>
  );
}
```

---

## Проверка разрешений

### Матрица разрешений

| Разрешение       | USER | ADMIN | PRIME |
| ---------------- | ---- | ----- | ----- |
| `read:all`       | ✅   | ✅    | ✅    |
| `create:asks`    | ✅   | ✅    | ✅    |
| `edit:own-asks`  | ✅   | ✅    | ✅    |
| `edit:all-asks`  | ❌   | ✅    | ✅    |
| `complete:asks`  | ❌   | ✅    | ✅    |
| `edit:arts`      | ❌   | ✅    | ✅    |
| `create:pallets` | ❌   | ✅    | ✅    |
| `delete:pallets` | ❌   | ✅    | ✅    |
| `manage:users`   | ❌   | ✅    | ✅    |
| `calculate:defs` | ❌   | ✅    | ✅    |

### Примеры использования разрешений

```tsx
import { usePermission } from "@/modules/auth/hooks";

function ActionsMenu() {
  const { can, canAny } = usePermission();

  return (
    <div>
      {/* Проверка одного разрешения */}
      {can("edit:arts") && <MenuItem>Редагувати артикули</MenuItem>}

      {/* Проверка нескольких разрешений (хотя бы одно) */}
      {canAny(["create:pallets", "edit:pallets"]) && (
        <MenuItem>Управління палетами</MenuItem>
      )}

      {/* Завершение заявок - только для ADMIN/PRIME */}
      {can("complete:asks") && <MenuItem>Завершити заявки</MenuItem>}

      {/* Расчет дефектов - только для ADMIN/PRIME */}
      {can("calculate:defs") && <MenuItem>Розрахувати дефекти</MenuItem>}
    </div>
  );
}
```

---

## Работа с API

### Автоматическое добавление токена

Токен автоматически добавляется ко всем запросам через `apiClient`:

```tsx
import { apiClient } from "@/lib/apiClient";

// Токен автоматически добавляется в заголовок Authorization
async function getUsers() {
  const response = await apiClient.get("/auth/users");
  return response.data;
}
```

### Обработка ошибок

API Client автоматически обрабатывает ошибки 401 и 403:

- **401 Unauthorized** - автоматический редирект на `/unauthorized`
- **403 Forbidden** - показ toast уведомления и редирект на `/forbidden`
- Токен истек - очистка данных и редирект

```tsx
// Не нужно обрабатывать ошибки авторизации вручную
async function deleteUser(id: string) {
  try {
    await apiClient.delete(`/auth/users/${id}`);
    // Успех
  } catch (error) {
    // Ошибки 401/403 уже обработаны interceptor'ом
    // Здесь только другие ошибки (404, 500, etc.)
  }
}
```

---

## Toast уведомления

Toast уведомления автоматически показываются для ошибок авторизации. Можно использовать и вручную:

```tsx
import { toast } from "@/components/ui/use-toast";

function SomeComponent() {
  const handleSuccess = () => {
    toast({
      title: "Успіх!",
      description: "Операція виконана успішно",
    });
  };

  const handleError = () => {
    toast({
      variant: "destructive",
      title: "Помилка",
      description: "Щось пішло не так",
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </div>
  );
}
```

---

## Полезные утилиты

### Работа с токенами

```tsx
import {
  isTokenExpired,
  decodeToken,
  getTimeUntilExpiry,
} from "@/modules/auth/utils/token";

function TokenStatus() {
  const { token } = useAuth();

  if (!token) return null;

  const isExpired = isTokenExpired(token);
  const timeLeft = getTimeUntilExpiry(token);
  const payload = decodeToken(token);

  return (
    <div>
      <p>Токен: {isExpired ? "Закінчився" : "Активний"}</p>
      <p>Час до закінчення: {timeLeft}</p>
      <p>ID користувача: {payload?.id}</p>
    </div>
  );
}
```

### Проверка ролей

```tsx
import { hasRoleAccess, getRoleLabel } from "@/constants/roles";

function RoleDisplay({ role }) {
  const label = getRoleLabel(role);
  const canEdit = hasRoleAccess(role, RoleType.ADMIN);

  return (
    <div>
      <p>Роль: {label}</p>
      <p>Може редагувати: {canEdit ? "Так" : "Ні"}</p>
    </div>
  );
}
```

---

## Коды ошибок

### 401 Unauthorized

- `NO_TOKEN` - токен отсутствует
- `INVALID_TOKEN_FORMAT` - неверный формат
- `TOKEN_EXPIRED` - токен истек
- `INVALID_TOKEN` - невалидный токен

### 403 Forbidden

- `INSUFFICIENT_PERMISSIONS` - недостаточно прав
- `NOT_RESOURCE_OWNER` - не владелец ресурса
- `INVALID_USER_ROLE` - невалидная роль

---

## Лучшие практики

1. **Используйте PermissionGuard вместо RoleGuard** когда нужна гранулярная проверка прав
2. **Проверяйте isAuthenticated** перед доступом к данным пользователя
3. **Используйте ResourceOwnerGuard** для проверки владельца ресурса
4. **Не храните чувствительные данные** в localStorage (только токен и базовая информация о пользователе)
5. **Всегда используйте apiClient** для запросов к API

---

**Дата создания:** 14 октября 2025  
**Версия:** 1.0.0
