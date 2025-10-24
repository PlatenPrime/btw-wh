/**
 * Универсальный тип для ответов API с единичными сущностями
 * Используется для всех GET endpoints, которые возвращают одну сущность
 */
export interface EntityResponse<T> {
  exists: boolean;
  message: string;
  data: T | null;
}
