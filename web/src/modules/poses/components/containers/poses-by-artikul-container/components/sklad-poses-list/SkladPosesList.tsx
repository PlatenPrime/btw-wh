import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { PosResponse, WarehouseData } from "@/modules/poses/api/types";
import { Circle, Package } from "lucide-react";

interface SkladPosesListProps {
  skladData: WarehouseData;
  title: string;
  renderPos: (
    pos: PosResponse,
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
      <Wrapper>
        <p className="text-muted-foreground text-center font-semibold">
          На складі {title} немає позицій з цим артикулом
        </p>
      </Wrapper>
    );

  return (
    <Wrapper className="grid gap-2">
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
            <div key={pos._id}>
              {renderPos(
                { exists: true, message: "", data: pos },
                additionalProps,
              )}
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
