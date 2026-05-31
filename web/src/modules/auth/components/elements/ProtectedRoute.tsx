import { Loader } from "@/components/shared/feedback/loading-states";
import { useAuth } from "@/modules/auth/api/hooks/useAuth.ts";
import type { RoleType } from "@/modules/auth/api/types";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  /**
   * Дети компонента (защищенная страница)
   */
  children: ReactNode;

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
  const { user, isLoading, hasAnyRole } = useAuth();
  const location = useLocation();

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return <Loader />;
  }

  // Если пользователь не авторизован - редирект на unauthorized
  if (!user) {
    // Исключаем публичные страницы из редиректа
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/unauthorized" &&
      location.pathname !== "/forbidden"
    ) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // Если указаны allowedRoles - проверяем права доступа
  if (user && allowedRoles && allowedRoles.length > 0) {
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
      return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
}
