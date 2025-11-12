import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PullPosition } from "@/modules/pulls/api/types";
import { Boxes, ClipboardList, Package } from "lucide-react";

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

export function PullPositionCardView({
  position,
  onClick,
  isCompleted = false,
}: PullPositionCardViewProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer p-2 transition-colors",
        isCompleted
          ? "bg-muted opacity-70"
          : "hover:border-primary hover:bg-accent/40",
      )}
      onClick={onClick}
    >
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-start gap-2">
          <ArtikulImageLink
            artikul={position.artikul}
            nameukr={position.nameukr}
            bage={
              position.plannedQuant != null ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  <ClipboardList className="h-3 w-3" />
                  План: {position.plannedQuant}
                </Badge>
              ) : (
                <Badge variant="secondary">Ручний відбір</Badge>
              )
            }
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Package className="text-muted-foreground h-4 w-4" />
          <span>
            Доступно:{" "}
            <strong>
              {position.currentQuant} шт. / {position.currentBoxes} кор.
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Boxes className="text-muted-foreground h-4 w-4" />
          <span>{getProgressLabel(position)}</span>
        </div>

        <UserAvatarName
          fullname={position.askerData.fullname}
          photoUrl={position.askerData.photo}
        />
      </CardContent>
    </Card>
  );
}
