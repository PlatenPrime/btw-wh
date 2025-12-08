import type { IPositionForPull } from "@/modules/asks/api/types/dto";
import { AskPos } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/components/ask-pos/AskPos";
import type { PosResponse } from "@/modules/poses/api/types";

interface AskPullPositionCardProps {
  position: IPositionForPull;
  askId: string;
}

export function AskPullPositionCard({
  position,
  askId,
}: AskPullPositionCardProps) {
  // Преобразуем IPositionForPull в IPos для совместимости
  // palletData из IPositionForPull содержит дополнительное поле isDef,
  // которое структурно совместимо с PosPalletData
  const posData = {
    _id: position._id,
    pallet: position.pallet,
    row: position.row,
    palletData: {
      _id: position.palletData._id,
      title: position.palletData.title,
      sector: position.palletData.sector,
      // isDef не передается в IPos, так как оно не входит в PosPalletData
      // но поле доступно в position.palletData если нужно
    },
    rowData: position.rowData,
    palletTitle: position.palletTitle,
    rowTitle: position.rowTitle,
    artikul: position.artikul,
    nameukr: position.nameukr,
    quant: position.quant,
    boxes: position.boxes,
    date: position.date,
    sklad: position.sklad,
    createdAt: position.createdAt,
    updatedAt: position.updatedAt,
    comment: position.comment,
    limit: position.limit,
  };

  // Преобразуем в PosResponse формат
  const posResponse: PosResponse = {
    exists: true,
    message: "",
    data: posData,
  };

  return (
    <AskPos
      pos={posResponse}
      askId={askId}
      initialRemovedQuant={position.plannedQuant ?? undefined}
    />
  );
}
