/** Краткое представление паллеты в контексте группы (из API pallet-groups). */
export interface PalletShortDto {
  id: string;
  title: string;
  sector: number;
  isDef: boolean;
  isEmpty: boolean;
}

/** Группа паллет. */
export interface PalletGroupDto {
  id: string;
  title: string;
  order: number;
  pallets?: PalletShortDto[];
}

/** Ответ API: список групп паллет. */
export interface PalletGroupsResponseDto {
  message: string;
  data: PalletGroupDto[];
}

/** Ответ API: одна группа паллет (с паллетами). */
export interface PalletGroupResponseDto {
  message: string;
  data: PalletGroupDto;
}

/** Создание группы. */
export interface CreatePalletGroupDto {
  title: string;
  order: number;
}

/** Обновление группы (название и/или порядок). */
export interface UpdatePalletGroupDto {
  title?: string;
  order?: number;
}

/** Установка состава паллет группы (set-pallets). */
export interface SetPalletsForGroupDto {
  groupId: string;
  palletIds: string[];
}

/** Отвязка паллеты от группы. */
export interface UnlinkPalletDto {
  palletId: string;
}

/** Ответ: пересчёт секторов. */
export interface RecalculatePalletsSectorsResponseDto {
  message: string;
  data: {
    updatedPallets: number;
    groupsProcessed: number;
  };
}

/** Ответ: сброс секторов. */
export interface ResetPalletsSectorsResponseDto {
  message: string;
  data: {
    matchedCount: number;
    modifiedCount: number;
  };
}
