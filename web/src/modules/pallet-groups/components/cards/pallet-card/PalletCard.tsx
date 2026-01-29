import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/pallet-groups/api/types";
import { Link } from "react-router";
import { PalletCardActions } from "./components/pallet-card-actions/PalletCardActions";

interface PalletCardProps {
  pallet: PalletShortDto;
  onUnlink?: (pallet: PalletShortDto) => void;
}

export function PalletCard({ pallet, onUnlink }: PalletCardProps) {
  return (
    <Card className="p-2 gap-0">
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-0">
        <Link
          to={`/wh/pallets/${pallet.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "min-w-0 flex-1 truncate text-sm font-semibold",
            "transition-colors duration-200 hover:underline",
          )}
        >
          {pallet.title}
        </Link>
        <PalletCardActions pallet={pallet} onUnlink={onUnlink} />
      </CardHeader>
      <CardContent className="text-muted-foreground p-0 pt-2 text-xs">
        <div className="flex justify-between gap-2">
          <span>Сектор:</span>
          <span className="font-mono">{pallet.sector}</span>
        </div>
      </CardContent>
    </Card>
  );
}
