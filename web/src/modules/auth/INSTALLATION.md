# 📦 Установка зависимостей для системы авторизации

## Необходимые пакеты

Для работы системы авторизации нужно установить следующие пакеты:

```bash
npm install @radix-ui/react-toast lucide-react class-variance-authority
```

### Описание пакетов

- **@radix-ui/react-toast** - компонент для toast уведомлений
- **lucide-react** - иконки (используется в toast)
- **class-variance-authority** - утилита для управления вариантами классов

## Что уже должно быть установлено

Проект использует следующие зависимости (должны быть уже установлены):

- `react` и `react-dom`
- `react-router-dom` (для роутинга)
- `axios` (для HTTP запросов)
- `tailwindcss` (для стилей)

## Проверка установки

После установки выполните:

```bash
npm run build
```

Если нет ошибок - все установлено корректно!

## Возможные проблемы

### Ошибка "Cannot find module '@radix-ui/react-toast'"

**Решение:**

```bash
npm install @radix-ui/react-toast
```

### Ошибка "Cannot find module 'lucide-react'"

**Решение:**

```bash
npm install lucide-react
```

### TypeScript ошибки

Если возникают ошибки типов, попробуйте:

```bash
npm install --save-dev @types/node
```

---

## Структура файлов после установки

```
web/src/
├── constants/
│   └── roles.ts                  # Константы ролей и утилиты
├── components/
│   └── ui/
│       ├── toast.tsx            # Компонент toast
│       ├── toaster.tsx          # Провайдер toast
│       └── use-toast.ts         # Хук для toast
├── lib/
│   └── apiClient.tsx            # API клиент с interceptors
└── modules/
    └── auth/
        ├── api/
        │   ├── hooks/
        │   │   └── useAuth.ts   # Основной хук авторизации
        │   ├── services/        # API сервисы
        │   └── types/           # TypeScript типы
        ├── components/
        │   ├── ProtectedRoute.tsx
        │   ├── RoleGuard.tsx
        │   ├── PermissionGuard.tsx
        │   └── ResourceOwnerGuard.tsx
        ├── hooks/
        │   ├── useRole.ts
        │   └── usePermission.ts
        ├── pages/
        │   ├── login.tsx
        │   ├── register.tsx
        │   ├── unauthorized.tsx
        │   └── forbidden.tsx
        ├── providers/
        │   └── auth-provider/
        │       └── auth-provider.tsx
        ├── types/
        │   └── errors.ts
        ├── utils/
        │   └── token.ts
        └── README.md
```

---

## Быстрый старт

1. **Установите зависимости:**

```bash
npm install @radix-ui/react-toast lucide-react class-variance-authority
```

2. **Убедитесь что Toaster добавлен в App.tsx:**

```tsx
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div>
      {/* ... ваш контент */}
      <Toaster />
    </div>
  );
}
```

3. **Проверьте что AuthProvider обернут вокруг приложения:**

```tsx
// в providers.tsx
import { AuthProvider } from "@/modules/auth/providers/auth-provider/auth-provider";

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
};
```

4. **Запустите проект:**

```bash
npm run dev
```

---

**Готово!** Теперь можно использовать систему авторизации.

См. [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) для примеров использования.
