import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { RoleType } from "@/modules/auth/api/types";

interface ProtectedRouteProps {
  /**
   * Дети компонента (защищенная страница)
   */
  children: React.ReactNode;

  /**
   * Разрешенные роли для доступа к странице
   * Если не указано - доступно всем авторизованным
   * С учетом иерархии: PRIME > ADMIN > EDITOR > USER
   */
  allowedRoles?: RoleType[];

  /**
   * Если true, требуется точное совпадение роли (без учета иерархии)
   * По умолчанию - false
   */
  exactMatch?: boolean;
}

/**
 * 🛡️ Компонент для защиты роутов от неавторизованных пользователей
 * и проверки прав доступа на основе ролей
 *
 * @example
 * // Доступно только авторизованным
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 *
 * @example
 * // Доступно только админам и выше
 * <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
 *   <AdminPanel />
 * </ProtectedRoute>
 *
 * @example
 * // Доступно только PRIME
 * <ProtectedRoute allowedRoles={[RoleType.PRIME]} exactMatch>
 *   <SuperAdminPanel />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  allowedRoles,
  exactMatch = false,
}: ProtectedRouteProps) {
  const { user, isLoading, hasAnyRole, isAuthenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Ждем завершения проверки авторизации
    if (isLoading) {
      return;
    }

    // Определяем текущий путь
    const currentPath = segments.join("/");
    const publicRoutes = ["login", "register", "unauthorized", "forbidden"];

    // Если пользователь не авторизован
    if (!user || !isAuthenticated) {
      // Исключаем публичные страницы из редиректа
      if (!publicRoutes.some((route) => currentPath.includes(route))) {
        router.replace("/login");
      }
      return;
    }

    // Если указаны allowedRoles - проверяем права доступа
    if (allowedRoles && allowedRoles.length > 0) {
      let hasAccess = false;

      if (exactMatch) {
        // Точное совпадение роли
        hasAccess = allowedRoles.includes(user.role);
      } else {
        // Проверка с учетом иерархии
        hasAccess = hasAnyRole(allowedRoles);
      }

      // Если нет доступа - редирект на forbidden
      if (!hasAccess) {
        router.replace("/forbidden");
        return;
      }
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, exactMatch, hasAnyRole, router, segments]);

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-typography-500">Завантаження...</Text>
      </View>
    );
  }

  // Если пользователь не авторизован - не показываем контент
  if (!user || !isAuthenticated) {
    return null;
  }

  // Если указаны allowedRoles - проверяем права доступа
  if (allowedRoles && allowedRoles.length > 0) {
    let hasAccess = false;

    if (exactMatch) {
      // Точное совпадение роли
      hasAccess = allowedRoles.includes(user.role);
    } else {
      // Проверка с учетом иерархии
      hasAccess = hasAnyRole(allowedRoles);
    }

    // Если нет доступа - не показываем контент
    if (!hasAccess) {
      return null;
    }
  }

  return <>{children}</>;
}

