import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { usePermission } from "@/modules/auth/hooks/usePermission";
import type { ReactNode } from "react";

interface ResourceOwnerGuardProps {
  /**
   * Дети компонента, которые будут отображены при успешной проверке
   */
  children: ReactNode;

  /**
   * ID владельца ресурса
   */
  ownerId: string;

  /**
   * Тип действия: 'edit' или 'delete'
   */
  action: "edit" | "delete";

  /**
   * Компонент для отображения при отсутствии прав
   * По умолчанию - null (ничего не отображается)
   */
  fallback?: ReactNode;
}

/**
 * 👤 Компонент для проверки прав на редактирование/удаление ресурса
 *
 * Проверяет:
 * 1. Является ли пользователь владельцем ресурса
 * 2. Или имеет ли права редактировать/удалять чужие ресурсы (ADMIN/PRIME)
 *
 * @example
 * // Показать кнопку редактирования только владельцу или админу
 * <ResourceOwnerGuard ownerId={ask.asker} action="edit">
 *   <EditButton />
 * </ResourceOwnerGuard>
 *
 * @example
 * // Показать кнопку удаления
 * <ResourceOwnerGuard
 *   ownerId={ask.asker}
 *   action="delete"
 *   fallback={<p>Немає прав</p>}
 * >
 *   <DeleteButton />
 * </ResourceOwnerGuard>
 */
export function ResourceOwnerGuard({
  children,
  ownerId,
  action,
  fallback = null,
}: ResourceOwnerGuardProps) {
  const { user } = useAuth();
  const { canEditResource, canDeleteResource } = usePermission();

  if (!user) {
    return <>{fallback}</>;
  }

  let hasAccess = false;

  if (action === "edit") {
    hasAccess = canEditResource(ownerId);
  } else if (action === "delete") {
    hasAccess = canDeleteResource(ownerId);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
