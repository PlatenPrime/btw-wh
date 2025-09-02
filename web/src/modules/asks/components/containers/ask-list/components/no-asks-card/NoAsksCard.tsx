import { Card } from "@/components/ui/card";
import { formatDisplayDate } from "@/utils/date";

interface NoAsksCardProps {
  selectedDate: Date;
}

export function NoAsksCard({ selectedDate }: NoAsksCardProps) {
  return (
    <Card className="p-8 text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Запитів не знайдено</h3>
        <p className="text-muted-foreground text-sm">
          На {formatDisplayDate(selectedDate)} немає активних запитів
        </p>
      </div>
    </Card>
  );
}
