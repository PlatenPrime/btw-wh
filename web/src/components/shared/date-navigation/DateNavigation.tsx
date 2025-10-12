import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDateLabel } from "@/utils/date";
import { isToday } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DateNavigationProps {
  selectedDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
}

export function DateNavigation({
  selectedDate,
  onPreviousDay,
  onNextDay,
  onDateSelect,
}: DateNavigationProps) {
  return (
    <div className="flex items-center justify-start gap-2">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousDay}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={onNextDay}
          className="h-8 w-8"
          disabled={isToday(selectedDate)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <span className="font-medium">{getDateLabel(selectedDate)}</span>
    </div>
  );
}
