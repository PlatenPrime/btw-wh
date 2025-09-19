import { cn } from "@/lib/utils";
import type { PosResponse } from "@/modules/poses/api/types";

interface SkladListPosProps {
  pos: PosResponse;
  onClick?: () => void;
}

export function SkladListPos({ pos, onClick }: SkladListPosProps) {
  const isBoxesEmpty = pos.boxes === 0;
  const isQuantEmpty = pos.quant === 0;
  const isPosEmpty = isBoxesEmpty && isQuantEmpty;

  return (
    <div
      className={cn(
        "hover:bg-muted/25 block cursor-pointer rounded-md px-2 py-1 transition-colors",
        isPosEmpty ? "opacity-50" : "",
      )}
      onClick={onClick}
    >
      <div className="grid grid-cols-3">
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-medium">
            {pos.palletData?.title || "Невідома палета"}
          </h4>
        </div>

        <span
          className={cn(
            "flex items-center justify-center gap-1",
            isBoxesEmpty ? "text-muted-foreground" : "",
          )}
        >
          {pos.boxes || 0}
        </span>
        <span
          className={cn(
            "flex items-center justify-end gap-1",
            isQuantEmpty ? "text-muted-foreground" : "",
          )}
        >
          {pos.quant || 0}
        </span>
      </div>
    </div>
  );
}
