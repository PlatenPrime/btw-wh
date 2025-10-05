import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sklads, type ISklads } from "@/constants/sklad";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { Circle, Package, Warehouse } from "lucide-react";

import { PosInfoItem } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInfoItem.tsx";

import { cn } from "@/lib/utils";
import type { IPos } from "@/modules/poses/api/types";
import { Link } from "react-router";
import { PosCardActionMenu } from "./components/pos-card-action-menu/PosCardActionMenu";

interface PosInPalletCardProps {
  pos: IPos;
  isNew?: boolean;
  onSuccess?: () => void;
}

export function PosInPalletCardView({
  pos,
  isNew = false,
  onSuccess,
}: PosInPalletCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex h-32 flex-col justify-between gap-2 overflow-hidden p-2 transition-all duration-200 hover:shadow-lg",
        isNew && "ring-2 ring-green-500/50",
      )}
    >
      {/* Header with image, title and actions */}
      <CardHeader className="flex min-h-0 flex-shrink-0 items-start gap-3 p-0 pb-2">
        {/* Image and title section */}
        <div className="flex min-h-0 flex-1 items-start gap-3">
          <ArtDialogImage artikul={pos.artikul} />
          <div className="flex min-h-0 flex-1 flex-col justify-between gap-1">
            <CardTitle className="truncate text-base leading-tight font-semibold">
              <Link
                to={`/arts/${pos.artikul}`}
                className="transition-colors duration-300 ease-in-out hover:text-blue-800 dark:hover:text-blue-200"
              >
                {pos.artikul}
              </Link>
            </CardTitle>
            <span className="text-muted-foreground line-clamp-2 text-xs leading-tight">
              {pos.nameukr?.slice(10) || "Назва українською"}
            </span>
          </div>
        </div>

        <PosCardActionMenu pos={pos} onSuccess={onSuccess || (() => {})} />
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
            className={cn(pos.boxes === 0 && "text-destructive")}
          />
          <PosInfoItem
            icon={Circle}
            value={pos.quant || 0}
            className={cn(pos.quant === 0 && "text-destructive")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
