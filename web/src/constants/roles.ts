/**
 * 🔐 Константы и утилиты для работы с ролями пользователей
 */

/**
 * Типы ролей в системе с иерархией
 * PRIME (3) > ADMIN (2) > USER (1)
 */
export const RoleType = {
  PRIME: "PRIME",
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

/**
 * Числовое представление иерархии ролей
 * Чем выше число, тем больше прав
 */
export const ROLE_HIERARCHY: Record<RoleType, number> = {
  [RoleType.PRIME]: 3,
  [RoleType.ADMIN]: 2,
  [RoleType.USER]: 1,
};

/**
 * Проверяет, имеет ли пользователь доступ на основе роли
 *
 * @param userRole - Роль текущего пользователя
 * @param requiredRole - Требуемая минимальная роль
 * @returns true если у пользователя достаточно прав
 *
 * @example
 * hasRoleAccess(RoleType.ADMIN, RoleType.USER) // true - ADMIN >= USER
 * hasRoleAccess(RoleType.USER, RoleType.ADMIN) // false - USER < ADMIN
 * hasRoleAccess(RoleType.PRIME, RoleType.ADMIN) // true - PRIME >= ADMIN
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
 *
 * @param role - Строка для проверки
 * @returns true если роль валидна
 */
export function isValidRole(role: string): role is RoleType {
  return Object.values(RoleType).includes(role as RoleType);
}

/**
 * Получает числовой уровень роли
 *
 * @param role - Роль пользователя
 * @returns Числовой уровень роли или 0 если роль невалидна
 */
export function getRoleLevel(role: string): number {
  if (!isValidRole(role)) return 0;
  return ROLE_HIERARCHY[role as RoleType];
}

/**
 * Проверяет, имеет ли пользователь одну из требуемых ролей
 *
 * @param userRole - Роль текущего пользователя
 * @param allowedRoles - Массив разрешенных ролей
 * @returns true если пользователь имеет одну из разрешенных ролей (с учетом иерархии)
 *
 * @example
 * hasAnyRole(RoleType.PRIME, [RoleType.ADMIN]) // true
 * hasAnyRole(RoleType.USER, [RoleType.ADMIN, RoleType.PRIME]) // false
 */
export function hasAnyRole(
  userRole: string,
  allowedRoles: RoleType[],
): boolean {
  if (!isValidRole(userRole)) return false;

  // Проверяем, есть ли у пользователя доступ хотя бы к одной из требуемых ролей
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
  [RoleType.USER]: "Користувач",
};

/**
 * Получает название роли для отображения
 *
 * @param role - Роль пользователя
 * @returns Человекочитаемое название роли
 */
export function getRoleLabel(role: string): string {
  if (!isValidRole(role)) return "Невідома роль";
  return ROLE_LABELS[role as RoleType];
}
