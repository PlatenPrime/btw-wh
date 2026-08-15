import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import { IconWell } from "@/components/shared/elements";
import type { PalletShortDto } from "@/modules/pallet-groups/api/types";
import { ListOrdered } from "lucide-react";
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
            "min-w-0 flex-1 transition-colors duration-200 hover:underline",
            typography.listTitleCompact,
          )}
        >
          {pallet.title}
        </Link>
        <PalletCardActions pallet={pallet} onUnlink={onUnlink} />
      </CardHeader>
      <CardContent className={cn("p-0 pt-2", typography.gridSubtitle)}>
        <div className="flex items-center gap-2" aria-label="Сектор">
          <IconWell icon={ListOrdered} tone="edit" size="sm" />
          <span className="font-mono">{pallet.sector}</span>
        </div>
      </CardContent>
    </Card>
  );
}
