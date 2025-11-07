import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sklads, type ISklads } from "@/constants/sklad";
import { Circle, Package, Warehouse } from "lucide-react";

import { PosCardActions } from "@/modules/poses/components/cards/pos-in-pallet-card/components/pos-card-actions/PosCardActions";
import { PosInfoItem } from "@/modules/poses/components/cards/pos-in-pallet-card/components/pos-info-item/PosInfoItem";

import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
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
    <Card
      className={cn(
        "flex flex-col h-full justify-between gap-2 overflow-hidden p-2 transition-all duration-200 hover:shadow-lg animate-in fade-in-0 zoom-in-75",
      )}
    >
      {/* Header with image, title and actions */}
      <CardHeader className="flex min-h-0 flex-shrink-0 items-start gap-3 p-0 ">
        {/* Image and title section */}
        <ArtikulImageLink artikul={pos.artikul} nameukr={pos.nameukr || ""} />
        <PosCardActions pos={pos} onSuccess={onSuccess || (() => {})} />
      </CardHeader>

      {/* Content with metrics */}
      <CardContent className="flex-shrink-0 p-0">
        <div className="grid grid-cols-3 gap-1.5">
          <PosInfoItem
            icon={Warehouse}
            value={sklads[pos.sklad as keyof ISklads] || pos.sklad}
          />
          <PosInfoItem
            icon={Package}
            value={pos.boxes || 0}
            className={cn(pos.boxes === 0 && "text-destructive bg-destructive/10 hover:bg-destructive/20")}
          />
          <PosInfoItem
            icon={Circle}
            value={pos.quant || 0}
            className={cn(pos.quant === 0 && "text-destructive bg-destructive/10 hover:bg-destructive/20")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
