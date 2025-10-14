import {
  usePermission,
  type Permission,
} from "@/modules/auth/hooks/usePermission";
import type { ReactNode } from "react";

interface PermissionGuardProps {
  /**
   * Дети компонента, которые будут отображены при успешной проверке
   */
  children: ReactNode;

  /**
   * Требуемое разрешение
   */
  permission?: Permission;

  /**
   * Несколько разрешений (хотя бы одно должно быть)
   */
  permissions?: Permission[];

  /**
   * Если true, требуются ВСЕ указанные разрешения
   * По умолчанию - false (хотя бы одно)
   */
  requireAll?: boolean;

  /**
   * Компонент для отображения при отсутствии прав
   * По умолчанию - null (ничего не отображается)
   */
  fallback?: ReactNode;
}

/**
 * 🔐 Компонент для условного рендеринга на основе конкретных разрешений
 *
 * Более гранулярная проверка прав, чем RoleGuard
 *
 * @example
 * // Показать кнопку удаления только если есть право
 * <PermissionGuard permission="delete:pallets">
 *   <DeleteButton />
 * </PermissionGuard>
 *
 * @example
 * // Показать если есть хотя бы одно из разрешений
 * <PermissionGuard permissions={['edit:arts', 'create:arts']}>
 *   <ArtsManagementPanel />
 * </PermissionGuard>
 *
 * @example
 * // Показать только если есть ВСЕ разрешения
 * <PermissionGuard
 *   permissions={['edit:users', 'delete:users']}
 *   requireAll
 * >
 *   <UserManagement />
 * </PermissionGuard>
 */
export function PermissionGuard({
  children,
  permission,
  permissions,
  requireAll = false,
  fallback = null,
}: PermissionGuardProps) {
  const { can, canAny, canAll } = usePermission();

  let hasPermission = false;

  // Проверка одного разрешения
  if (permission) {
    hasPermission = can(permission);
  }
  // Проверка нескольких разрешений
  else if (permissions && permissions.length > 0) {
    hasPermission = requireAll ? canAll(permissions) : canAny(permissions);
  }

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}
