import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IPos } from "@/modules/poses/api/types";

interface PosContainerViewProps {
  pos: IPos;
}

export function PosContainerView({ pos }: PosContainerViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Позиція: {pos.artikul}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div>
            <span className="font-medium">Назва:</span>{" "}
            {pos.nameukr || "Не вказано"}
          </div>
          <div>
            <span className="font-medium">Кількість:</span> {pos.quant}
          </div>
          <div>
            <span className="font-medium">Коробки:</span> {pos.boxes}
          </div>
          <div>
            <span className="font-medium">Склад:</span> {pos.sklad}
          </div>
          <div>
            <span className="font-medium">Палета:</span> {pos.palletTitle}
          </div>
          <div>
            <span className="font-medium">Ряд:</span> {pos.rowTitle}
          </div>
          {pos.comment && (
            <div>
              <span className="font-medium">Коментар:</span> {pos.comment}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
