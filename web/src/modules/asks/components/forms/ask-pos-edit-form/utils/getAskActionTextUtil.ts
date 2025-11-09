import type { PosResponse } from "@/modules/poses/api/types";

interface GetAskActionTextProps {
  removedQuant: number;
  removedBoxes: number;
  pos: PosResponse;
}

export const getAskActionTextUtil = ({
  removedQuant,
  removedBoxes,
  pos,
}: GetAskActionTextProps) => {
  if (removedQuant >= 0) {
    return `Знято товару: ${removedQuant} шт., коробок: ${removedBoxes} шт. з палети ${pos.data?.palletData?.title || "невідома паллета"}`;
  }
  return `Додано товару: ${Math.abs(removedQuant)} шт., коробок: ${Math.abs(removedBoxes)} шт. до палети ${pos.data?.palletData?.title || "невідома паллета"}`;
};
