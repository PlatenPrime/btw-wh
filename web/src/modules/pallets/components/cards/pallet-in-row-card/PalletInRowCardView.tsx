import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import {  Calculator, LayoutGrid } from "lucide-react";
import { Link } from "react-router";
import { PalletCardActions } from "./PalletCardActions";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletInRowCardView({ pallet, rowId }: PalletInRowCardProps) {
  return (
    <Card className={cn("gap-2 p-2")}>
      <CardHeader className="flex items-start p-0">
        <Link
          to={`/wh/pallets/${pallet.title}`}
          className={cn(
            "",
            "flex w-full items-center justify-start gap-2 rounded-md transition-colors duration-300 ease-in-out hover:underline",
          )}
        >
          <span className="text-base font-semibold">{pallet.title}</span>
          {pallet.isEmpty && (
            <span className="text-muted-foreground border-muted-foreground bg-muted-foreground/10 rounded-md border px-1 text-xs font-semibold">
              порожня
            </span>
          )}
        </Link>
        <PalletCardActions pallet={pallet} rowId={rowId} />
      </CardHeader>

      <CardContent className="grid gap-2 p-0">
        <div className="border-border flex items-center justify-start gap-2 ">
          <LayoutGrid className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
          <span className="text-xs">{pallet.sector ?? "Немає"}</span>
        </div>

        <div className="border-border flex items-center justify-start gap-2 ">
          <Calculator className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
          <span className="text-xs">{pallet.isDef ? "Так" : "Ні"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
