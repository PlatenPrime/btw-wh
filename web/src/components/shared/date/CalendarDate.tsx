import { formatDate } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface CalendarDateBageProps {
  date: string;
}

export function CalendarDate({ date }: CalendarDateBageProps) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <CalendarIcon className="h-4 w-4" />
      <span className="text-muted-foreground text-sm">
        {formatDate(date, "dd MMMM yyyy, HH:mm", {
          locale: uk,
        })}
      </span>
    </div>
  );
}
