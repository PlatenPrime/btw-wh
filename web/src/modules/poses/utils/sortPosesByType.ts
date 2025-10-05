import type { IPos } from "../api/types";
import { sortNewPalletPoses } from "./sortNewPalletPoses";
import { sortOldPalletsPoses } from "./sortOldPalletsPoses";

/**
 * Разделяет позиции на новые и старые, сортирует их и объединяет
 * @param poses - массив всех позиций
 * @param newPosIds - массив ID новых позиций
 * @returns отсортированный массив позиций (сначала новые, потом старые)
 */
export const sortPosesByType = (
  poses: IPos[],
  newPosIds: string[] = [],
): IPos[] => {
  // Разделяем позиции на новые и старые
  const newPoses: IPos[] = [];
  const oldPoses: IPos[] = [];

  poses.forEach((pos) => {
    if (newPosIds.includes(pos._id)) {
      newPoses.push(pos);
    } else {
      oldPoses.push(pos);
    }
  });

  // Сортируем новые позиции по времени создания (хронологически)
  const sortedNewPoses = sortNewPalletPoses(newPoses, newPosIds);

  // Сортируем старые позиции по артикулу
  const sortedOldPoses = sortOldPalletsPoses(oldPoses);

  // Объединяем: сначала новые, потом старые
  return [...sortedNewPoses, ...sortedOldPoses];
};
