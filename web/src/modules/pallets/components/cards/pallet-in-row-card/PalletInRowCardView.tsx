import { GridTileCard } from "@/components/shared/cards";
import { CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { iconSize, typography } from "@/lib/typography";
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
          <span className={typography.gridTitle}>{pallet.title}</span>
          {pallet.isEmpty ? (
            <span className={cn("rounded-md border border-muted-foreground bg-muted-foreground/10 px-1 font-semibold", typography.caption)}>
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
          <LayoutGrid className={cn(iconSize.inline, "text-muted-foreground")} aria-hidden />
          <span className={typography.caption}>{pallet.sector ?? "Немає"}</span>
        </div>

        <div className="flex items-center justify-start gap-2 border-border">
          <Calculator className={cn(iconSize.inline, "text-muted-foreground")} aria-hidden />
          <span className={typography.caption}>{pallet.isDef ? "Так" : "Ні"}</span>
        </div>

        {pallet.palgrId && pallet.palgrTitle ? (
          <div className="flex items-center justify-start gap-2 border-border">
            <Layers className={cn(iconSize.inline, "text-muted-foreground")} aria-hidden />
            <Link
              to={`/wh/pallet-groups/${pallet.palgrId}`}
              className={cn("hover:underline", typography.caption)}
            >
              {pallet.palgrTitle}
            </Link>
          </div>
        ) : null}
      </CardContent>
    </GridTileCard>
  );
}
