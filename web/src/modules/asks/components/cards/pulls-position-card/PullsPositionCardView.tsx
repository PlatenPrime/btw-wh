import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { ArtikulImageLink } from "@/components/shared/media/artikul-image-link/ArtikulImageLink";
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
      <CardContent className="flex flex-col gap-2 p-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className={cn("min-w-0 flex-1", typography.listTitleEmphasized)}>
            {position.palletTitle}
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="shrink-0"
          >
            Зняти товар
          </Button>
        </div>
        <ArtikulImageLink
          artikul={position.artikul}
          nameukr={position.nameukr}
          target="_self"
          link={`/arts/${position.artikul}`}
        />
        {position.askRemainingQuantity !== null && (
          <div className={cn("text-foreground flex items-center gap-1", typography.body)}>
            <Circle className={iconSize.inline} aria-hidden />
            {position.askRemainingQuantity}
          </div>
        )}
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
