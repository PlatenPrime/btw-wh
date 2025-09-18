import { Container } from "@/components/shared/container";
import type { WarehouseData } from "@/modules/poses/api/types";
import { Circle, Package } from "lucide-react";
import type { PosesByArtikulContainerViewProps } from "./types";

interface SkladPosesListProps {
  skladData: WarehouseData;
  title: string;
  renderPos: (pos: any, additionalProps?: any) => React.ReactNode;
  additionalProps?: any;
}

function SkladPosesList({
  skladData,
  title,
  renderPos,
  additionalProps,
}: SkladPosesListProps) {
  if (!skladData.poses?.length) return null;

  return (
    <Container className="grid gap-2">
      <div className="grid grid-cols-3">
        <h3 className="pl-4 font-semibold">{title}</h3>
        <div className="flex items-center justify-center gap-1 font-semibold">
          <Package className="h-3 w-3" />
          <span>{skladData.boxes || 0}</span>
        </div>
        <div className="flex items-center justify-end gap-1 pr-2 font-semibold">
          <Circle className="h-3 w-3" />
          <span>{skladData.quant || 0}</span>
        </div>
      </div>

      {skladData.poses?.length > 0 && (
        <div className="grid gap-2">
          {skladData.poses?.map((pos) => (
            <div key={pos._id}>{renderPos(pos, additionalProps)}</div>
          ))}
        </div>
      )}
    </Container>
  );
}

export function PosesByArtikulContainerView({
  data,
  renderPos,
  additionalProps,
}: PosesByArtikulContainerViewProps) {
  const { pogrebi, merezhi } = data;

  return (
    <div className="grid gap-4">
      {/* Позиции по складам */}
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <SkladPosesList
          skladData={pogrebi}
          title="Погреби"
          renderPos={renderPos}
          additionalProps={additionalProps}
        />
        <SkladPosesList
          skladData={merezhi}
          title="Мережі"
          renderPos={renderPos}
          additionalProps={additionalProps}
        />
      </div>
    </div>
  );
}
