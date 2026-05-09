/**
 * 🔐 Константы и утилиты для работы с ролями пользователей
 */

/**
 * Типы ролей в системе с иерархией
 * PRIME (4) > ADMIN (3) > EDITOR (2) > USER (1)
 */
export const RoleType = {
  PRIME: "PRIME",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  USER: "USER",
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

/**
 * Числовое представление иерархии ролей
 * Чем выше число, тем больше прав
 */
export const ROLE_HIERARCHY: Record<RoleType, number> = {
  [RoleType.PRIME]: 4,
  [RoleType.ADMIN]: 3,
  [RoleType.EDITOR]: 2,
  [RoleType.USER]: 1,
};

/**
 * Проверяет, имеет ли пользователь доступ на основе роли
 */
export function hasRoleAccess(
  userRole: string,
  requiredRole: RoleType,
): boolean {
  if (!isValidRole(userRole)) return false;

  const userLevel = ROLE_HIERARCHY[userRole as RoleType] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole];

  return userLevel >= requiredLevel;
}

/**
 * Проверяет, является ли строка валидной ролью
 */
export function isValidRole(role: string): role is RoleType {
  return Object.values(RoleType).includes(role as RoleType);
}

/**
 * Получает числовой уровень роли
 */
export function getRoleLevel(role: string): number {
  if (!isValidRole(role)) return 0;
  return ROLE_HIERARCHY[role as RoleType];
}

/**
 * Проверяет, имеет ли пользователь одну из требуемых ролей
 */
export function hasAnyRole(
  userRole: string,
  allowedRoles: RoleType[],
): boolean {
  if (!isValidRole(userRole)) return false;

  return allowedRoles.some((requiredRole) =>
    hasRoleAccess(userRole, requiredRole),
  );
}

/**
 * Человекочитаемые названия ролей (для UI)
 */
export const ROLE_LABELS: Record<RoleType, string> = {
  [RoleType.PRIME]: "Суперадміністратор",
  [RoleType.ADMIN]: "Адміністратор",
  [RoleType.EDITOR]: "Редактор",
  [RoleType.USER]: "Користувач",
};

/**
 * Получает название роли для отображения
 */
export function getRoleLabel(role: string): string {
  if (!isValidRole(role)) return "Невідома роль";
  return ROLE_LABELS[role as RoleType];
}
