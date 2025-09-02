import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousDay}
          className="h-10 w-10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-3">
          <span className="text-lg font-medium">
            {getDateLabel(selectedDate)}
          </span>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
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
          className="h-10 w-10"
          disabled={isToday(selectedDate)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
