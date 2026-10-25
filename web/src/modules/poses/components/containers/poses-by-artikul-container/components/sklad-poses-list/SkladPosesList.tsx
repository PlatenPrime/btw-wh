import { DetailPanelCard } from "@/components/shared/cards";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { PosResponse, WarehouseData } from "@/modules/poses/api/types";
import { Circle, Package } from "lucide-react";
import { memo } from "react";
import { Virtuoso } from "react-virtuoso";

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
  if (!skladData.poses?.length) {
    return (
      <DetailPanelCard className="grid gap-3 p-4 sm:p-5">
        <h3 className={typography.sectionTitle}>{title}</h3>
        <p className={cn(typography.body, "text-center text-muted-foreground")}>
          На складі {title} немає позицій з цим артикулом
        </p>
      </DetailPanelCard>
    );
  }

  const shouldVirtualize = skladData.poses.length >= 50;

  return (
    <DetailPanelCard className="grid gap-3 p-4 sm:p-5">
      <div className="grid grid-cols-3 items-center gap-2">
        <h3 className={typography.sectionTitle}>{title}</h3>
        <div className={cn("flex items-center justify-center gap-1", typography.value)}>
          <Package className={iconSize.inline} />
          <span>{skladData.boxes || 0}</span>
        </div>
        <div className={cn("flex items-center justify-end gap-1", typography.value)}>
          <Circle className={iconSize.inline} />
          <span>{skladData.quant || 0}</span>
        </div>
      </div>

      {shouldVirtualize ? (
        <Virtuoso
          data={skladData.poses}
          itemContent={(_index, pos) => (
            <div className="mb-3">
              {renderPos(
                { exists: true, message: "", data: pos },
                additionalProps,
              )}
            </div>
          )}
          style={{ height: "400px" }}
        />
      ) : (
        <div className="grid gap-3">
          {skladData.poses.map((pos) => (
            <div key={pos._id}>
              {renderPos(
                { exists: true, message: "", data: pos },
                additionalProps,
              )}
            </div>
          ))}
        </div>
      )}
    </DetailPanelCard>
  );
});
