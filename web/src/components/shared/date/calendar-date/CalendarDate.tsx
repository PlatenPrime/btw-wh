import { formatDate } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { iconSize, typography } from "@/lib/typography";

interface CalendarDateBageProps {
  date: string;
}

export function CalendarDate({ date }: CalendarDateBageProps) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <CalendarIcon className={iconSize.ui} />
      <span className={typography.caption}>
        {formatDate(date, "dd MMMM yyyy, HH:mm", {
          locale: uk,
        })}
      </span>
    </div>
  );
}
