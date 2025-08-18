import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { Edit } from "lucide-react";
import { UpdatePalletDialog } from "../../dialogs/update-pallet-dialog";

interface TooltipEditPalletProps {
  pallet: PalletShortDto;
  onSuccess: () => void;
  rowId: string;
}

export function TooltipEditPallet({
  pallet,
  onSuccess,
  rowId,
}: TooltipEditPalletProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <UpdatePalletDialog
            pallet={pallet}
            rowId={rowId}
            trigger={
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            }
            onSuccess={onSuccess}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Редагувати палету</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
