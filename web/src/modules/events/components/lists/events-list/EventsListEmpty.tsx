import { Card } from "@/components/ui/card";
import { formatDisplayDate } from "@/utils/date";

interface EventsListEmptyProps {
  selectedDate: Date;
}

export function EventsListEmpty({ selectedDate }: EventsListEmptyProps) {
  return (
    <Card className="p-8 text-center">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Подій не знайдено</h3>
        <p className="text-muted-foreground text-sm">
          На {formatDisplayDate(selectedDate)} немає зафіксованих подій
        </p>
      </div>
    </Card>
  );
}
