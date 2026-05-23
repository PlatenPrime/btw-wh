import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { PosResponse } from "@/modules/poses/api/types";

interface SkladListPosProps {
  pos: PosResponse;
  onClick?: () => void;
}

export function SkladListPos({ pos, onClick }: SkladListPosProps) {
  const isBoxesEmpty = pos.data!.boxes === 0;
  const isQuantEmpty = pos.data!.quant === 0;

  return (
    <Card
      className={cn(
        "block cursor-pointer rounded-md border border-border/60 p-2 shadow-elevation-1 transition-colors hover:bg-muted/40 hover:shadow-elevation-2",
      )}
      onClick={onClick}
    >
      <div className="grid grid-cols-3 text-sm">
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-bold text-base">
            {pos.data?.palletData?.title || "Невідома палета"}
          </h4>
        </div>

        <span
          className={cn(
            "flex items-center justify-center gap-1",
            isBoxesEmpty ? "text-destructive" : "",
          )}
        >
          {pos.data?.boxes || 0}
        </span>
        <span
          className={cn(
            "flex items-center justify-end gap-1",
            isQuantEmpty ? "text-destructive" : "",
          )}
        >
          {pos.data?.quant || 0}
        </span>
      </div>
    </Card>
  );
}
