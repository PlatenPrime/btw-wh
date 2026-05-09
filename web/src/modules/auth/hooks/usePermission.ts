import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

/**
 * Типы разрешений на основе матрицы доступа из бекенда
 */
export type Permission =
  // Общие разрешения
  | "read:all" // Чтение любых данных
  | "create:asks" // Создание заявок
  | "edit:own-asks" // Редактирование своих заявок
  | "delete:own-asks" // Удаление своих заявок

  // Административные разрешения
  | "edit:all-asks" // Редактирование всех заявок
  | "delete:all-asks" // Удаление всех заявок
  | "complete:asks" // Завершение заявок (PATCH complete)
  | "reject:asks" // Отклонение заявок (PATCH reject)
  | "manage:asks-actions" // Управление действиями заявок

  // Arts
  | "edit:arts" // Редактирование артикулов
  | "create:arts" // Создание/обновление артикулов (upsert)

  // Pallets
  | "create:pallets" // Создание паллет
  | "edit:pallets" // Редактирование паллет
  | "delete:pallets" // Удаление паллет

  // Poses
  | "create:poses" // Создание позиций
  | "edit:poses" // Редактирование позиций
  | "delete:poses" // Удаление позиций

  // Rows
  | "create:rows" // Создание рядов
  | "edit:rows" // Редактирование рядов
  | "delete:rows" // Удаление рядов

  // Defs
  | "calculate:defs" // Расчет дефектов (только ADMIN/PRIME)

  // Users
  | "manage:users" // Управление пользователями
  | "view:all-users" // Просмотр всех пользователей
  | "edit:users" // Редактирование пользователей
  | "view:roles"; // Просмотр ролей

/**
 * Матрица прав доступа на основе ролей
 */
const PERMISSION_MATRIX: Record<RoleType, Permission[]> = {
  PRIME: [
    // PRIME имеет все права
    "read:all",
    "create:asks",
    "edit:own-asks",
    "delete:own-asks",
    "edit:all-asks",
    "delete:all-asks",
    "complete:asks",
    "reject:asks",
    "manage:asks-actions",
    "edit:arts",
    "create:arts",
    "create:pallets",
    "edit:pallets",
    "delete:pallets",
    "create:poses",
    "edit:poses",
    "delete:poses",
    "create:rows",
    "edit:rows",
    "delete:rows",
    "calculate:defs",
    "manage:users",
    "view:all-users",
    "edit:users",
    "view:roles",
  ],

  ADMIN: [
    // ADMIN имеет большинство прав, кроме некоторых критических
    "read:all",
    "create:asks",
    "edit:own-asks",
    "delete:own-asks",
    "edit:all-asks",
    "delete:all-asks",
    "complete:asks",
    "reject:asks",
    "manage:asks-actions",
    "edit:arts",
    "create:arts",
    "create:pallets",
    "edit:pallets",
    "create:poses",
    "edit:poses",
    "delete:poses",
    "create:rows",
    "edit:rows",
    "calculate:defs",
    "view:all-users",
    "view:roles",
  ],

  /**
   * EDITOR: модерація asks (без delete чужих), палети/створення позицій;
   * без адмін-модулів (arts upsert, rows/zones/blocks, defs calculate, …)
   */
  EDITOR: [
    "read:all",
    "create:asks",
    "edit:own-asks",
    "delete:own-asks",
    "complete:asks",
    "reject:asks",
    "manage:asks-actions",
    "create:pallets",
    "edit:pallets",
    "create:poses",
  ],

  USER: [
    // USER имеет ограниченные права
    "read:all",
    "create:asks",
    "edit:own-asks",
    "delete:own-asks",
  ],
};

/**
 * 🔐 Хук для проверки конкретных разрешений пользователя
 *
 * @returns Объект с методами проверки разрешений
 *
 * @example
 * const { can, canAny, canAll } = usePermission();
 *
 * if (can('edit:arts')) {
 *   // Показать кнопку редактирования артикулов
 * }
 *
 * if (canAny(['edit:pallets', 'delete:pallets'])) {
 *   // Показать панель управления паллетами
 * }
 */
export function usePermission() {
  const { user } = useAuth();

  /**
   * Проверяет, имеет ли пользователь конкретное разрешение
   */
  const can = (permission: Permission): boolean => {
    if (!user || !user.role) return false;

    const userPermissions = PERMISSION_MATRIX[user.role] || [];
    return userPermissions.includes(permission);
  };

  /**
   * Проверяет, имеет ли пользователь хотя бы одно из указанных разрешений
   */
  const canAny = (permissions: Permission[]): boolean => {
    return permissions.some((permission) => can(permission));
  };

  /**
   * Проверяет, имеет ли пользователь все указанные разрешения
   */
  const canAll = (permissions: Permission[]): boolean => {
    return permissions.every((permission) => can(permission));
  };

  /**
   * Проверяет, может ли пользователь редактировать чужие ресурсы
   */
  const canEditOthers = (): boolean => {
    return can("edit:all-asks");
  };

  /**
   * Проверяет, может ли пользователь удалять чужие ресурсы
   */
  const canDeleteOthers = (): boolean => {
    return can("delete:all-asks");
  };

  /**
   * Проверяет, является ли пользователь владельцем ресурса
   * И соответственно может ли его редактировать
   */
  const canEditResource = (resourceOwnerId: string): boolean => {
    if (!user) return false;

    // Если пользователь владелец - может редактировать
    if (user._id === resourceOwnerId) return true;

    // Если у пользователя есть права редактировать чужое - может
    return canEditOthers();
  };

  /**
   * Проверяет, может ли пользователь удалить ресурс
   */
  const canDeleteResource = (resourceOwnerId: string): boolean => {
    if (!user) return false;

    // Если пользователь владелец - может удалить
    if (user._id === resourceOwnerId) return true;

    // Если у пользователя есть права удалять чужое - может
    return canDeleteOthers();
  };

  return {
    can,
    canAny,
    canAll,
    canEditOthers,
    canDeleteOthers,
    canEditResource,
    canDeleteResource,
  };
}
