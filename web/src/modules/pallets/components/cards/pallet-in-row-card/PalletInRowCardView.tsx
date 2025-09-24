import { EditTrigger } from "@/components/shared/triggers/edit-trigger/EditTrigger";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { UpdatePalletDialog } from "@/modules/pallets/components/dialogs/update-pallet-dialog/UpdatePalletDialog";
import { Columns4, FlaskConical, FlaskConicalOff, Hash } from "lucide-react";
import { Link } from "react-router";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletInRowCardView({ pallet, rowId }: PalletInRowCardProps) {
  return (
    <Card className={cn("gap-2 p-2")}>
      <CardHeader className="m-0 flex items-start gap-2 p-0">
        <Link
          to={`/wh/pallets/${pallet.title}`}
          className={cn(pallet.isEmpty && "bg-muted", "flex w-full items-center justify-start gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:text-blue-800 dark:hover:text-blue-200")}
        >
          <Columns4 className={cn("h-4 w-4")} />
          <span className="text-sm font-medium">{pallet.title}</span>
        </Link>
        <UpdatePalletDialog
          pallet={pallet}
          rowId={rowId}
          trigger={<EditTrigger />}
        />
      </CardHeader>
      <CardContent className="flex items-start justify-between gap-2 p-0 px-2">
        {pallet.sector && (
          <span className="flex items-center gap-2 text-xs">
            <Hash className="h-4 w-4" />
            {pallet.sector}
          </span>
        )}

        <span className={cn("flex items-center gap-2 text-xs")}>
          {pallet.isDef ? (
            <FlaskConical className="h-4 w-4" />
          ) : (
            <FlaskConicalOff className="h-4 w-4" />
          )}
        </span>
      </CardContent>
    </Card>
  );
}
