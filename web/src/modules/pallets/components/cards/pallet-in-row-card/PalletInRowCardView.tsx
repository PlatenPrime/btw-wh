import { GridTileCard } from "@/components/shared/cards";
import { CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { Calculator, Layers, LayoutGrid } from "lucide-react";
import { Link } from "react-router";
import { PalletCardActions } from "./PalletCardActions";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletInRowCardView({ pallet, rowId }: PalletInRowCardProps) {
  return (
    <GridTileCard
      className={cn(
        "h-full w-full gap-2 p-2",
        pallet.isEmpty
          ? "border-destructive/30 bg-destructive/10"
          : "border-warning/30 bg-warning/10",
      )}
    >
      <CardHeader className="p-0">
        <Link
          to={`/wh/pallets/${pallet.title}`}
          className="flex min-w-0 items-center gap-2 rounded-md transition-colors duration-300 ease-in-out hover:underline"
        >
          <span className="text-base font-semibold">{pallet.title}</span>
          {pallet.isEmpty ? (
            <span className="rounded-md border border-muted-foreground bg-muted-foreground/10 px-1 text-xs font-semibold text-muted-foreground">
              порожня
            </span>
          ) : null}
        </Link>
        <CardAction>
          <PalletCardActions pallet={pallet} rowId={rowId} />
        </CardAction>
      </CardHeader>

      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-start gap-2 border-border">
          <LayoutGrid className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="text-xs">{pallet.sector ?? "Немає"}</span>
        </div>

        <div className="flex items-center justify-start gap-2 border-border">
          <Calculator className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="text-xs">{pallet.isDef ? "Так" : "Ні"}</span>
        </div>

        {pallet.palgrId && pallet.palgrTitle ? (
          <div className="flex items-center justify-start gap-2 border-border">
            <Layers className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            <Link
              to={`/wh/pallet-groups/${pallet.palgrId}`}
              className="text-xs hover:underline"
            >
              {pallet.palgrTitle}
            </Link>
          </div>
        ) : null}
      </CardContent>
    </GridTileCard>
  );
}
