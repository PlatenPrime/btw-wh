import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { PullPosition } from "@/modules/pulls/api/types";
import { CheckCircle2, Package, User, ClipboardList, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

interface PullPositionCardViewProps {
  position: PullPosition;
  onClick: () => void;
  isCompleted?: boolean;
}

const getProgressLabel = (position: PullPosition) => {
  const { totalRequestedQuant, alreadyPulledQuant } = position;

  if (totalRequestedQuant == null) {
    return `Знято: ${alreadyPulledQuant} шт.`;
  }

  return `Прогрес: ${alreadyPulledQuant} / ${totalRequestedQuant} шт.`;
};

const getBoxesLabel = (position: PullPosition) => {
  if (position.alreadyPulledBoxes === 0) {
    return null;
  }

  return `Коробок: ${position.alreadyPulledBoxes}`;
};

export function PullPositionCardView({
  position,
  onClick,
  isCompleted = false,
}: PullPositionCardViewProps) {
  return (
    <Card
      className={cn(
        "transition-colors",
        isCompleted
          ? "bg-muted opacity-70"
          : "hover:border-primary hover:bg-accent/40",
      )}
    >
      <CardContent className="grid gap-3 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <ArtDialogImage artikul={position.artikul} />
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onClick}
                disabled={isCompleted}
                className={cn(
                  "text-sm font-semibold transition-colors",
                  isCompleted
                    ? "cursor-not-allowed text-muted-foreground"
                    : "cursor-pointer text-foreground hover:text-primary",
                )}
              >
                {position.artikul}
              </button>
              {position.plannedQuant != null ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  <ClipboardList className="h-3 w-3" />
                  План: {position.plannedQuant}
                </Badge>
              ) : (
                <Badge variant="secondary">Ручний відбір</Badge>
              )}
              {isCompleted && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Завершено
                </Badge>
              )}
            </div>
            {position.nameukr && (
              <p className="text-muted-foreground text-sm">{position.nameukr}</p>
            )}
          </div>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span>
              Доступно:{" "}
              <strong>
                {position.currentQuant} шт. / {position.currentBoxes} кор.
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-muted-foreground" />
            <span>{getProgressLabel(position)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{position.askerData.fullname}</span>
          </div>
        </div>
        {getBoxesLabel(position) && (
          <div className="text-muted-foreground text-xs">
            {getBoxesLabel(position)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
