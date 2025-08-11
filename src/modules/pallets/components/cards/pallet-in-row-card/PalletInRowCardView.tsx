import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { Columns4 } from "lucide-react";
import { Link } from "react-router";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
}

const isEmptyStyle = "bg-muted-foreground/20";

export function PalletInRowCardView({ pallet }: PalletInRowCardProps) {
  return (
    <Link to={`/wh/pallets/${pallet.title}`} className="block">
      <Card
        className={cn(
          "hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors",
          pallet.isEmpty && isEmptyStyle,
        )}
      >
        <div className="flex items-center gap-2">
          <Columns4 className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-medium">{pallet.title}</span>
          {pallet.sector && (
            <span className="text-muted-foreground ml-2 text-xs">
              {pallet.sector}
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}
