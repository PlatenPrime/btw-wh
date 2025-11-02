import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IPull } from "@/modules/pulls/api/types/dto";
import { Package, MapPin } from "lucide-react";

interface PullCardViewProps {
  pull: IPull;
  onClick: () => void;
}

export function PullCardView({ pull, onClick }: PullCardViewProps) {
  return (
    <Card
      className="cursor-pointer hover:bg-accent transition-colors"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {pull.palletTitle}
          </span>
          <div className="flex gap-2">
            <Badge variant="outline">
              <MapPin className="h-3 w-3 mr-1" />
              Сектор {pull.sector}
            </Badge>
            <Badge variant="outline">Ряд: {pull.rowTitle}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Позицій: {pull.positions.length}</span>
          <span>Запитів: {pull.totalAsks}</span>
        </div>
      </CardContent>
    </Card>
  );
}

