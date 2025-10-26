import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/pallets/api/types";
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
        <div className="border-border flex items-center justify-between gap-2 border-b">
          <span className="flex items-center gap-2 text-xs">Сектор:</span>
          <span className="text-xs">{pallet.sector ?? "Немає"}</span>
        </div>

        <div className="border-border flex items-center justify-between gap-2 border-b">
          {" "}
          <span className="flex items-center gap-2 text-xs">Аналіз:</span>
          <span className="text-xs">{pallet.isDef ? "Так" : "Ні"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
