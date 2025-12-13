import type { IPositionForPullsPage } from "@/modules/asks/api/types/dto";
import type { PosResponse } from "@/modules/poses/api/types";
import { useState } from "react";
import { PullsPositionCardView } from "./PullsPositionCardView";

interface PullsPositionCardProps {
  position: IPositionForPullsPage;
}

export function PullsPositionCard({ position }: PullsPositionCardProps) {
  const [open, setOpen] = useState(false);

  // Преобразуем IPositionForPullsPage в PosResponse для совместимости с AskPosEditDialog
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

    />
  );
}

