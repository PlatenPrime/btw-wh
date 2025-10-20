import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { RoleType } from "@/modules/auth/api/types";

/**
 * 🔐 Хук для проверки роли текущего пользователя
 *
 * @returns Объект с методами проверки роли и текущей ролью пользователя
 *
 * @example
 * const { hasRole, currentRole, isAdmin, isPrime, isUser } = useRole();
 *
 * if (hasRole(RoleType.ADMIN)) {
 *   // Показать админский функционал
 * }
 *
 * if (isAdmin || isPrime) {
 *   // Доступ для админов и суперюзеров
 * }
 */
export function useRole() {
  const { user, hasRole: checkRole, hasAnyRole } = useAuth();

  const currentRole = user?.role || null;

  /**
   * Проверяет наличие конкретной роли с учетом иерархии
   */
  const hasRole = (requiredRole: RoleType): boolean => {
    return checkRole(requiredRole);
  };

  /**
   * Проверяет наличие хотя бы одной из указанных ролей
   */
  const hasAnyOfRoles = (allowedRoles: RoleType[]): boolean => {
    return hasAnyRole(allowedRoles);
  };

  /**
   * Проверяет, является ли пользователь админом или выше
   */
  const isAdminOrHigher = (): boolean => {
    if (!currentRole) return false;
    return checkRole("ADMIN" as RoleType);
  };

  /**
   * Проверяет, является ли пользователь PRIME
   */
  const isPrime = (): boolean => {
    return currentRole === "PRIME";
  };

  /**
   * Проверяет, является ли пользователь ADMIN (или выше)
   */
  const isAdmin = (): boolean => {
    return isAdminOrHigher();
  };

  /**
   * Проверяет, является ли пользователь обычным USER
   */
  const isUser = (): boolean => {
    return currentRole === "USER";
  };

  return {
    currentRole,
    hasRole,
    hasAnyOfRoles,
    isAdminOrHigher,
    isPrime,
    isAdmin,
    isUser,
  };
}
