import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { IPullPosition } from "@/modules/pulls/api/types/dto";
import { CheckCircle2, Package, User } from "lucide-react";

interface PullPositionCardViewProps {
  position: IPullPosition;
  onClick: () => void;
  isCompleted?: boolean;
}

export function PullPositionCardView({
  position,
  onClick,
  isCompleted = false,
}: PullPositionCardViewProps) {
  const handleClick = () => {
    if (!isCompleted) {
      onClick();
    }
  };

  return (
    <Card
      className={`transition-colors ${
        isCompleted
          ? "bg-muted opacity-50"
          : "hover:bg-accent hover:border-primary"
      }`}
    >
      <CardContent className="pt-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Header: Image + Article + Badge */}
          <div className="flex items-start gap-3">
            <ArtDialogImage artikul={position.artikul} />
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <button
                onClick={handleClick}
                disabled={isCompleted}
                className={`text-sm font-semibold transition-all ${
                  !isCompleted
                    ? "text-foreground hover:text-primary cursor-pointer hover:underline"
                    : "text-muted-foreground cursor-not-allowed"
                }`}
              >
                {position.artikul}
              </button>
              {isCompleted && (
                <Badge variant="outline" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Оброблено
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {position.nameukr && (
            <p className="text-muted-foreground text-xs">{position.nameukr}</p>
          )}

          {/* Info Grid */}
          <div className="grid gap-2 text-sm sm:grid-cols-[1fr_auto_auto]">
            <div className="flex items-center gap-2">
              <Package className="text-muted-foreground h-4 w-4 shrink-0" />
              <span className="break-words">
                Доступно:{" "}
                <strong>
                  {position.currentQuant} шт. / {position.currentBoxes} кор.
                </strong>
              </span>
            </div>
            {position.requestedQuant > 0 && (
              <span className="break-words">
                Запитано: <strong>{position.requestedQuant}</strong>
              </span>
            )}
            <div className="flex items-center gap-2">
              <User className="text-muted-foreground h-4 w-4 shrink-0" />
              <span className="text-muted-foreground break-words">
                {position.askerData.fullname}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
