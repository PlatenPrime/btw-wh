import { useState } from "react";
import type { IPositionForPullsPage } from "@/modules/asks/api/types/dto";
import type { PosResponse } from "@/modules/poses/api/types";
import { PullsPositionCardView } from "./PullsPositionCardView";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface PullsPositionCardProps {
  position: IPositionForPullsPage;
}

export function PullsPositionCard({ position }: PullsPositionCardProps) {
  const [open, setOpen] = useState(false);
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  // Преобразуем IPositionForPullsPage в IPos для совместимости с AskPosEditDialog
  const posData = {
    _id: position._id,
    pallet: position.pallet,
    row: position.row,
    palletData: {
      _id: position.palletData._id,
      title: position.palletData.title,
      sector: position.palletData.sector,
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

  const posResponse: PosResponse = {
    exists: true,
    message: "",
    data: posData,
  };

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <PullsPositionCardView
      position={position}
      posResponse={posResponse}
      open={open}
      setOpen={setOpen}
      onSuccess={handleSuccess}
      bgColor={bgColor}
      borderColor={borderColor}
    />
  );
}

