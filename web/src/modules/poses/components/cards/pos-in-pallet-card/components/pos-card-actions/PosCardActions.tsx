import { Button } from "@/components/ui/button";
import type { IPos } from "@/modules/poses/api/types";
import { DeletePosDialog } from "@/modules/poses/components/dialogs/delete-pos-dialog/DeletePosDialog";
import { UpdatePosDialog } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialog";
import { Edit, Trash } from "lucide-react";

interface PosCardActionsProps {
  pos: IPos;
  onSuccess: () => void;
}

export function PosCardActions({ pos, onSuccess }: PosCardActionsProps) {
  return (
    <div className="flex gap-1">
      <UpdatePosDialog
        pos={pos}
        trigger={
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted h-6 w-6 p-0"
          >
            <Edit className="h-3 w-3" />
          </Button>
        }
        onSuccess={onSuccess}
      />
      <DeletePosDialog
        pos={pos}
        trigger={
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted hover:text-destructive h-6 w-6 p-0"
          >
            <Trash className="h-3 w-3" />
          </Button>
        }
        onSuccess={onSuccess}
      />
    </div>
  );
}
