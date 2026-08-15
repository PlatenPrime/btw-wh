import { GridTileCard } from "@/components/shared/cards";
import { CardContent, CardHeader } from "@/components/ui/card";
import { sklads, type ISklads } from "@/constants/sklad";
import { Circle, Package, Warehouse } from "lucide-react";

import { PosCardActions } from "@/modules/poses/components/cards/pos-in-pallet-card/components/pos-card-actions/PosCardActions";
import { PosInfoItem } from "@/modules/poses/components/cards/pos-in-pallet-card/components/pos-info-item/PosInfoItem";

import { ArtikulImageLink } from "@/components/shared/media/artikul-image-link/ArtikulImageLink";
import { cn } from "@/lib/utils";
import type { IPos } from "@/modules/poses/api/types";

interface PosInPalletCardProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosInPalletCardView({
  pos,
  onSuccess,
}: PosInPalletCardProps) {
  return (
    <GridTileCard className="flex h-full w-full flex-col justify-between gap-2 overflow-hidden p-2">
      <CardHeader className="flex min-h-0 shrink-0 items-start gap-3 p-0">
        <ArtikulImageLink artikul={pos.artikul} nameukr={pos.nameukr || ""} />
        <PosCardActions pos={pos} onSuccess={onSuccess ?? (() => {})} />
      </CardHeader>

      <CardContent className="shrink-0 p-0">
        <div className="grid grid-cols-3 gap-1.5">
          <PosInfoItem
            icon={Warehouse}
            tone="primary"
            value={sklads[pos.sklad as keyof ISklads] || pos.sklad}
          />
          <PosInfoItem
            icon={Package}
            tone={pos.boxes === 0 ? "destructive" : "info"}
            value={pos.boxes || 0}
            className={cn(
              pos.boxes === 0 &&
                "bg-destructive/10 text-destructive hover:bg-destructive/20",
            )}
          />
          <PosInfoItem
            icon={Circle}
            tone={pos.quant === 0 ? "destructive" : "success"}
            value={pos.quant || 0}
            className={cn(
              pos.quant === 0 &&
                "bg-destructive/10 text-destructive hover:bg-destructive/20",
            )}
          />
        </div>
      </CardContent>
    </GridTileCard>
  );
}
