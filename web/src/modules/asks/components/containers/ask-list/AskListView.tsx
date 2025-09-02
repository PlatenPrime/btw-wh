import { ErrorDisplay } from "@/components/error-components";
import { FetchIndicator } from "@/components/fetch-indicator";
import { Loading, LoadingNoData } from "@/components/loading-states";
import { Card } from "@/components/ui/card";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { LoaderPinwheel } from "lucide-react";
import { Asks } from "./components/asks/Asks";
import { DateNavigation } from "./components/date-navigation/DateNavigation";
import { NoAsksCard } from "./components/no-asks-card/NoAsksCard";

interface AskListViewProps {
  selectedDate: Date;
  data: GetAsksByDateResponse | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
}

export function AskListView({
  selectedDate,
  data,
  isLoading,
  isFetching,
  error,
  onPreviousDay,
  onNextDay,
  onDateSelect,
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

  if (!isLoading && !isFetching && !data?.data) {
    return <LoadingNoData description="Немає даних для відображення" />;
  }

  return (
    <div className="space-y-6">
      <DateNavigation
        selectedDate={selectedDate}
        onPreviousDay={onPreviousDay}
        onNextDay={onNextDay}
        onDateSelect={onDateSelect}
      />

      {isLoading && (
        <Loading
          skeleton={
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-muted/50 h-32 animate-pulse" />
              ))}
            </div>
          }
        />
      )}

      {isFetching && (
        <FetchIndicator
          total={data?.count || 0}
          isFetching={isFetching}
          icon={<LoaderPinwheel className="animate-spin" />}
        />
      )}

      {data?.data && data.data.length === 0 && (
        <NoAsksCard selectedDate={selectedDate} />
      )}

      {data?.data && data.data.length > 0 && (
        <Asks selectedDate={selectedDate} data={data} />
      )}
    </div>
  );
}
