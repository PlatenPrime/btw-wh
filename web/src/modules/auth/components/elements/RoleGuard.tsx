import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { RoleType } from "@/modules/auth/api/types";
import type { ReactNode } from "react";

interface RoleGuardProps {
  /**
   * Дети компонента, которые будут отображены при успешной проверке
   */
  children: ReactNode;

  /**
   * Разрешенные роли (с учетом иерархии)
   * Если указано ["ADMIN"], то PRIME также получит доступ
   */
  allowedRoles: RoleType[];

  /**
   * Компонент для отображения при отсутствии прав
   * По умолчанию - null (ничего не отображается)
   */
  fallback?: ReactNode;

  /**
   * Если true, требуется точное совпадение роли (без учета иерархии)
   * По умолчанию - false (учитывается иерархия)
   */
  exactMatch?: boolean;
}

/**
 * 🛡️ Компонент для условного рендеринга на основе роли пользователя
 *
 * Использует иерархию ролей: PRIME > ADMIN > EDITOR > USER
 *
 * @example
 * // Показать только для админов и выше
 * <RoleGuard allowedRoles={[RoleType.ADMIN]}>
 *   <AdminPanel />
 * </RoleGuard>
 *
 * @example
 * // Показать для всех авторизованных
 * <RoleGuard allowedRoles={[RoleType.USER]}>
 *   <UserProfile />
 * </RoleGuard>
 *
 * @example
 * // С fallback
 * <RoleGuard
 *   allowedRoles={[RoleType.PRIME]}
 *   fallback={<p>Доступ запрещен</p>}
 * >
 *   <SuperAdminPanel />
 * </RoleGuard>
 */
export function RoleGuard({
  children,
  allowedRoles,
  fallback = null,
  exactMatch = false,
}: RoleGuardProps) {
  const { user, hasAnyRole } = useAuth();

  // Если пользователь не авторизован
  if (!user || !user.role) {
    return <>{fallback}</>;
  }

  // Точное совпадение роли
  if (exactMatch) {
    const hasExactRole = allowedRoles.includes(user.role);
    return hasExactRole ? <>{children}</> : <>{fallback}</>;
  }

  // Проверка с учетом иерархии
  const hasAccess = hasAnyRole(allowedRoles);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
