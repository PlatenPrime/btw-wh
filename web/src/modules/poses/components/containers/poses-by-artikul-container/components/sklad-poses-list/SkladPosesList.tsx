import { Container } from "@/components/shared/containers/Container";
import type { IPos, WarehouseData } from "@/modules/poses/api/types";
import { Circle, Package } from "lucide-react";

interface SkladPosesListProps {
  skladData: WarehouseData;
  title: string;
  renderPos: (
    pos: IPos,
    additionalProps?: Record<string, unknown>,
  ) => React.ReactNode;
  additionalProps?: Record<string, unknown>;
}

export function SkladPosesList({
  skladData,
  title,
  renderPos,
  additionalProps,
}: SkladPosesListProps) {
  if (!skladData.poses?.length)
    return (
      <Container>
        <p className="text-center font-semibold text-muted-foreground" >На складі {title} немає позицій з цим артикулом</p>
      </Container>
    );

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
