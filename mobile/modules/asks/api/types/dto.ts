import type { User } from "@/modules/auth/api/types";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
export type AskStatus =
  | "new"
  | "processing"
  | "completed"
  | "rejected"
  | "fail"
  | "solved";
export const validAskStatuses: AskStatus[] = [
  "new",
  "processing",
  "completed",
  "rejected",
  "fail",
  "solved",
];

export type AskEventName = "create" | "pull" | "complete" | "reject";

export interface AskEventPullDetails {
  palletData: {
    _id: string;
    title: string;
  };
  quant: number;
  boxes: number;
}

export interface AskEvent {
  _id?: string;
  eventName: AskEventName;
  date: string;
  userData: AskUserData;
  pullDetails?: AskEventPullDetails;
}

export interface AskDto {
  _id: string;
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  sklad?: "pogrebi" | "merezhi";
  asker: string;
  askerData: AskUserData;
  solver?: string;
  solverData?: AskUserData;
  status: AskStatus;
  pullQuant?: number;
  pullBox?: number;
  pullBoxes?: number;
  events: AskEvent[];
  actions?: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface GetAsksByDateResponse {
  message: string;
  data: AskDto[];
  date: string;
  count: number;
  newCount: number;
  processingCount: number;
  completedCount: number;
  rejectedCount: number;
}

import type { IPos } from "@/modules/poses/api/types";

export interface AskResponse {
  data: AskDto;
}

export type GetAskByIdResponse = AskResponse;

// Типы для получения позиций для снятия
export interface PalletDataForPull {
  _id: string;
  title: string;
  sector?: string; // Сектор паллеты (для сортировки)
  isDef: boolean;
}

export interface IPositionForPull extends Omit<IPos, "palletData"> {
  /** Данные паллеты с дополнительным полем isDef */
  palletData: PalletDataForPull;
  /** Количество для снятия с этой позиции (null если quant не указан в ask) */
  plannedQuant: number | null;
}

export interface GetAskPullResponse {
  /** Флаг необходимости снятия товара */
  isPullRequired: boolean;
  /** Список позиций для снятия, отсортированных по сектору паллеты (по возрастанию) */
  positions: IPositionForPull[];
  /** Оставшееся количество для снятия (null если quant не указан в ask) */
  remainingQuantity: number | null;
  /** Статус снятия */
  status: "process" | "satisfied" | "no_poses" | "finished";
  /** Сообщение для пользователя */
  message: string;
}

export interface GetAskPullByIdResponse {
  data: GetAskPullResponse;
}

// Типы для получения всех позиций для снятия по всем активным заявкам
export interface IPositionForPullsPage extends IPositionForPull {
  /** ID заявки, для которой предназначена позиция */
  askId: string;
  /** Артикул из заявки (для удобства и генерации events) */
  askArtikul: string;
  /** Количество товара, которое просят в заявке (null если в заявке не указано требуемое количество) */
  askQuant: number | null;
  /** Оставшееся количество для снятия по заявке (null если в заявке не указано требуемое количество) */
  askRemainingQuantity: number | null;
}

export interface PositionsBySector {
  /** Номер сектора паллеты */
  sector: number;
  /** Позиции в данном секторе */
  positions: IPositionForPullsPage[];
}

export interface GetAsksPullsResponse {
  message: string;
  data: {
    /** Позиции для снятия, сгруппированные по секторам паллет. Каждая позиция содержит полную информацию о заявке (askId, askArtikul, askQuant, askRemainingQuantity) */
    positionsBySector: PositionsBySector[];
  };
}

