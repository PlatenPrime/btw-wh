import { EditTrigger } from "@/components/shared/triggers/edit-trigger/EditTrigger";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { UpdatePalletDialog } from "@/modules/pallets/components/dialogs/update-pallet-dialog/UpdatePalletDialog";
import {
  FlaskConical,
  FlaskConicalOff,
  Grid3x3,
  Hash,
  SquareDashed,
} from "lucide-react";
import { Link } from "react-router";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletInRowCardView({ pallet, rowId }: PalletInRowCardProps) {
  return (
    <Card className={cn("gap-2 p-2")}>
      <CardHeader className="flex items-start gap-2 p-0">
        <Link
          to={`/wh/pallets/${pallet.title}`}
          className={cn(
            "",
            "flex w-full items-center justify-start gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:text-blue-800 dark:hover:text-blue-200 hover:underline ",
          )}
        >
          {pallet.isEmpty ? (
            <SquareDashed className="text-destructive h-3 w-3" />
          ) : (
            <Grid3x3 className={cn("h-3 w-3")} />
          )}
          <span className="text-base font-semibold">{pallet.title}</span>
        </Link>
        <UpdatePalletDialog
          pallet={pallet}
          rowId={rowId}
          trigger={<EditTrigger />}
        />
      </CardHeader>
      <CardContent className="flex items-start justify-between gap-2 p-0 px-2">
        <span className="flex items-center gap-2 text-xs">
          <Hash className="h-3 w-3" />
          {pallet.sector}
        </span>

        <span className={cn("flex items-center gap-2 text-xs")}>
          {pallet.isDef ? (
            <FlaskConical className="h-3 w-3" />
          ) : (
            <FlaskConicalOff className="h-3 w-3" />
          )}
        </span>
      </CardContent>
    </Card>
  );
}
