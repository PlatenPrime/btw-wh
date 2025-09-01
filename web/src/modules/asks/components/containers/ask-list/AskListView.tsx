import { ErrorDisplay } from "@/components/error-components";
import { Loading } from "@/components/loading-states";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { AsksListCard } from "@/modules/asks/components/asks-list-card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface AskListViewProps {
  selectedDate: Date;
  data: GetAsksByDateResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
  formatDisplayDate: (date: Date) => string;
  getDateLabel: (date: Date) => string;
  isToday: (date: Date) => boolean;
}

export function AskListView({
  selectedDate,
  data,
  isLoading,
  error,
  onPreviousDay,
  onNextDay,
  onDateSelect,
  formatDisplayDate,
  getDateLabel, 
  isToday,
}: AskListViewProps) {
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження запитів"
        description="Не вдалося завантажити запити для обраної дати"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Навигация по датам */}
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
                  <Calendar className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalendarComponent
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

      {/* Список запросов */}
      <div className="space-y-4">
        {isLoading ? (
          <Loading
            skeleton={
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-muted h-32 animate-pulse" />
                ))}
              </div>
            }
          />
        ) : data?.data && data.data.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Запити на {formatDisplayDate(selectedDate)}
              </h2>
              <span className="text-muted-foreground text-sm">
                Всього: {data.count}
              </span>
            </div>

            <div className="space-y-4">
              {data.data.map((ask) => (
                <AsksListCard key={ask._id} ask={ask} />
              ))}
            </div>
          </>
        ) : (
          <Card className="p-8 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Запитів не знайдено</h3>
              <p className="text-muted-foreground text-sm">
                На {formatDisplayDate(selectedDate)} немає активних запитів
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
