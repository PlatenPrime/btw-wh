import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
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

export const SkladPosesList = memo(function SkladPosesList({
  skladData,
  title,
  renderPos,
  additionalProps,
}: SkladPosesListProps) {
  if (!skladData.poses?.length)
    return (
      <p className="text-muted-foreground text-center font-semibold">
        На складі {title} немає позицій з цим артикулом
      </p>
    );

  const shouldVirtualize = skladData.poses.length >= 50;

  return (
    <div className="grid gap-2">
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
        <>
          {shouldVirtualize ? (
            <Virtuoso
              data={skladData.poses}
              itemContent={(_index, pos) => (
                <div className="mb-4">
                  {renderPos(
                    { exists: true, message: "", data: pos },
                    additionalProps,
                  )}
                </div>
              )}
              style={{ height: "400px" }}
            />
          ) : (
            <div className="grid gap-4">
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
        </>
      )}
    </div>
  );
});
