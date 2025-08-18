import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import type { RowRefetch } from "@/modules/rows/api/types/types";
import { Columns4 } from "lucide-react";
import { Link } from "react-router";
import { TooltipEditPallet } from "./tooltip-edit-pallet";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  refetch: RowRefetch;
  rowId: string;
}

const isEmptyStyle = "bg-muted-foreground/20";

export function PalletInRowCardView({
  pallet,
  refetch,
  rowId,
}: PalletInRowCardProps) {
  return (
    
      <Card
        className={cn(
          "hover:bg-muted/50 flex-row items-center justify-between  rounded-lg border p-3 transition-colors",
          pallet.isEmpty && isEmptyStyle,
        )}
      >
        <Link to={`/wh/pallets/${pallet.title}`} className="block hover:bg-amber-800">
        <div className="flex items-center gap-2">
          <Columns4 className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-medium">{pallet.title}</span>
          {pallet.sector && (
            <span className="text-muted-foreground ml-2 text-xs">
              {pallet.sector}
            </span>
          )}
        </div>
        </Link>
        <TooltipEditPallet pallet={pallet} onSuccess={refetch} rowId={rowId} />
      </Card>

  );
}
