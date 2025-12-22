import type { PosResponse, WarehouseData } from "@/modules/poses/api/types";
import { SkladPosesListView } from "./SkladPosesListView";
import type { ReactNode } from "react";

interface SkladPosesListProps {
  skladData: WarehouseData;
  title: string;
  renderPos: (
    pos: PosResponse,
    additionalProps?: Record<string, unknown>,
  ) => ReactNode;
  additionalProps?: Record<string, unknown>;
}

export function SkladPosesList({
  skladData,
  title,
  renderPos,
  additionalProps,
}: SkladPosesListProps) {
  // Адаптируем renderPos для работы с форматом веб-версии
  const adaptedRenderPos = (
    pos: { exists: boolean; message: string; data: WarehouseData["poses"][0] },
    props?: Record<string, unknown>,
  ) => {
    // Преобразуем в формат PosResponse для совместимости
    const posResponse: PosResponse = {
      data: pos.data,
    };
    return renderPos(posResponse, props);
  };

  return (
    <SkladPosesListView
      skladData={skladData}
      title={title}
      renderPos={adaptedRenderPos}
      additionalProps={additionalProps}
    />
  );
}

