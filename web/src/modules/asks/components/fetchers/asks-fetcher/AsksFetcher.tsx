import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useAsksByDateQuery } from "@/modules/asks/api";
import { format } from "date-fns";
import { useState } from "react";
import { AsksContainer } from "../../containers/asks-container/AsksContainer";
import { AsksContainerSkeleton } from "../../containers/asks-container/AsksContainerSkeleton";

export function AsksFetcher() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Форматируем дату для API (YYYY-MM-DD)
  const dateString = format(selectedDate, "yyyy-MM-dd");

  const { data, isLoading, isFetching, error } = useAsksByDateQuery({
    date: dateString,
  });

  if (isLoading) return <AsksContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження запитів"
        description="Не вдалося завантажити запити для обраної дати"
      />
    );

  if (!data)
    return <LoadingNoData description="Немає даних для відображення" />;

  return (
    <AsksContainer
      data={data}
      isFetching={isFetching}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
}
