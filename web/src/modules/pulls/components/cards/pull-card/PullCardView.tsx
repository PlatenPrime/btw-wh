import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IPull } from "@/modules/pulls/api/types/dto";
import { PullsCardAskPosition } from "@/modules/pulls/components/cards/pulls-card-ask-position";
import { MapPin, Package } from "lucide-react";
import { Link } from "react-router-dom";

interface PullCardViewProps {
  pull: IPull;
  onNavigate: () => void;
}

export function PullCardView({ pull, onNavigate }: PullCardViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link
            to={`/refiling/pulls/${pull.palletId}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate();
            }}
            className="flex items-center gap-2 transition-colors hover:underline"
          >
            <Package className="h-4 w-4" />
            {pull.palletTitle}
          </Link>
          <div className="flex gap-2">
            <Badge variant="outline">
              <MapPin className="mr-1 h-3 w-3" />
              Сектор {pull.sector}
            </Badge>
            <Badge variant="outline">Ряд: {pull.rowTitle}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>Позицій: {pull.positions.length}</span>
          <span>Запитів: {pull.totalAsks}</span>
        </div>
        <PullsCardAskPosition pull={pull} />
      </CardContent>
    </Card>
  );
}
