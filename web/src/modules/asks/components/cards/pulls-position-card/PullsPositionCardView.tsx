import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IPositionForPullsPage } from "@/modules/asks/api/types/dto";
import { AskPosEditDialog } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialog";
import type { PosResponse } from "@/modules/poses/api/types";
import { Circle } from "lucide-react";

interface PullsPositionCardViewProps {
  position: IPositionForPullsPage;
  posResponse: PosResponse;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export function PullsPositionCardView({
  position,
  posResponse,
  open,
  setOpen,
  onSuccess,
}: PullsPositionCardViewProps) {
  return (
    <Card className="p-0">
      <CardContent className="grid gap-2 p-2">
        <h4 className="text-base font-semibold text-center">{position.palletTitle}</h4>
        <hr/>
        <ArtikulImageLink
          artikul={position.artikul}
          nameukr={position.nameukr}
          target="_self"
          link={`/arts/${position.artikul}`}
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col justify-end gap-2 text-sm">
            {position.askRemainingQuantity !== null && (
              <div className="text-foreground flex items-center gap-1 text-sm">
                <Circle className="h-3 w-3" /> {position.askRemainingQuantity}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="w-fit "
            >
              Зняти товар
            </Button>
          </div>
        </div>
        <AskPosEditDialog
          pos={posResponse}
          askId={position.askId}
          open={open}
          setOpen={setOpen}
          onSuccess={onSuccess}
          initialRemovedQuant={position.plannedQuant ?? undefined}
        />
      </CardContent>
    </Card>
  );
}
