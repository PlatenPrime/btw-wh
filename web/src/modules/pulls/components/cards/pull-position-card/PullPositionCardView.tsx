import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IPullPosition } from "@/modules/pulls/api/types/dto";
import { CheckCircle2, Package, User } from "lucide-react";
import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";

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
  return (
    <Card
      className={`cursor-pointer transition-colors ${
        isCompleted
          ? "opacity-50 bg-muted"
          : "hover:bg-accent hover:border-primary"
      }`}
      onClick={!isCompleted ? onClick : undefined}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <ArtikulImageLink artikul={position.artikul} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{position.artikul}</span>
                {isCompleted && (
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Оброблено
                  </Badge>
                )}
              </div>
              {position.nameukr && (
                <p className="text-sm text-muted-foreground truncate">
                  {position.nameukr}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Доступно: <strong>{position.currentQuant}</strong>
                  </span>
                </div>
                {position.requestedQuant > 0 && (
                  <span>
                    Запитано: <strong>{position.requestedQuant}</strong>
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {position.askerData.fullname}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {!isCompleted && (
            <Button variant="outline" size="sm">
              Обробити
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

