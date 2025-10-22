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
            "flex w-full items-center justify-start gap-2 rounded-md transition-colors duration-300 ease-in-out hover:text-blue-800 hover:underline dark:hover:text-blue-200",
          )}
        >
          <span className="text-base font-semibold">{pallet.title}</span>
          {pallet.isEmpty && (
            <span className="text-muted-foreground border-muted-foreground rounded-md border px-1 text-xs">
              порожня
            </span>
          )}
        </Link>
        <PalletCardActions pallet={pallet} rowId={rowId} />
      </CardHeader>
      <CardContent className="flex items-start justify-between gap-2 p-0">
        <span className="flex items-center gap-2 text-xs">
          Сектор: <span className="">{pallet.sector ?? "-"}</span>
        </span>

        <span className={cn("flex items-center gap-2 text-xs")}>
          {pallet.isDef ? (
            <span className="">Аналіз</span>
          ) : (
            <span className="">Не аналіз</span>
          )}
        </span>
      </CardContent>
    </Card>
  );
}
