// Реэкспорт типов из shared для обратной совместимости
export type {
  AskDto,
  AskStatus,
  AskUserData,
  GetAskByIdResponse,
  GetAsksByDateResponse,
} from "@shared/modules/asks";

export { validAskStatuses } from "@shared/modules/asks";
