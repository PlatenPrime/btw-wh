import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Layers, NotebookText, Package } from "lucide-react";
import { Link } from "react-router";

interface PalletInfoViewProps {
  totalPositions: number;
  totalBoxes: number;
  palgrId?: string;
  palgrTitle?: string;
}

export function PalletInfoView({
  totalPositions,
  totalBoxes,
  palgrId,
  palgrTitle,
}: PalletInfoViewProps) {
  return (
    <div className="flex flex-wrap items-center justify-start gap-4 sm:justify-center">
      <div className="flex items-center gap-1">
        <NotebookText className="size-3" />
        <span className="font-semibold">{totalPositions}</span>
      </div>

      <div className="flex items-center gap-1">
        <Package className="size-3" />
        <span className="font-semibold">{totalBoxes}</span>
      </div>

      {palgrId && palgrTitle ? (
        <div className="flex items-center gap-1">
          <Layers className="size-3" />
          <Link
            to={`/wh/pallet-groups/${palgrId}`}
            className={cn("hover:underline", typography.caption)}
          >
            {palgrTitle}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
