import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePosByIdQuery } from "../../api/usePosByIdQuery";

interface PosDetailProps {
  posId: string;
  onBack?: () => void;
}

export function PosDetail({ posId, onBack }: PosDetailProps) {
  const { data: pos, isLoading, error } = usePosByIdQuery(posId);

  if (isLoading)
    return <div className="text-muted-foreground">Завантаження позиції...</div>;
  if (error)
    return <div className="text-destructive">Помилка завантаження позиції</div>;
  if (!pos)
    return <div className="text-muted-foreground">Позицію не знайдено</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {onBack && (
            <Button size="sm" variant="outline" onClick={onBack}>
              &larr; Назад
            </Button>
          )}
          <CardTitle>{pos.artikul}</CardTitle>
        </div>
        <div className="text-muted-foreground mt-1 text-xs">
          Додано:{" "}
          {pos.createdAt ? new Date(pos.createdAt).toLocaleDateString() : "—"} |
          Оновлено:{" "}
          {pos.updatedAt ? new Date(pos.updatedAt).toLocaleDateString() : "—"}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="font-medium">Кількість:</div>
            <div>{pos.quant}</div>
          </div>
          <div>
            <div className="font-medium">Коробок:</div>
            <div>{pos.boxes}</div>
          </div>
          <div>
            <div className="font-medium">Ліміт:</div>
            <div>{pos.limit}</div>
          </div>
          <div>
            <div className="font-medium">Палета:</div>
            <div>{pos.palletTitle}</div>
          </div>
          <div>
            <div className="font-medium">Ряд:</div>
            <div>{pos.rowTitle}</div>
          </div>
          <div>
            <div className="font-medium">Дата:</div>
            <div>{pos.date || "—"}</div>
          </div>
          <div>
            <div className="font-medium">Склад:</div>
            <div>{pos.sklad || "—"}</div>
          </div>
          <div className="md:col-span-2">
            <div className="font-medium">Коментар:</div>
            <div>{pos.comment}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
