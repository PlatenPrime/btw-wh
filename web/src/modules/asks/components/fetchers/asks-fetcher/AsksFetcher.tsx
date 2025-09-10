import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useAsksByDateQuery } from "@/modules/asks/api/hooks/queries/useAsksByDateQuery";
import { format } from "date-fns";
import { useState } from "react";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

interface AsksFetcherProps {
  ContainerComponent: ComponentType<{
    data: GetAsksByDateResponse;
    isFetching: boolean;
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  }>;
  SkeletonComponent: ComponentType;
  initialDate?: Date;
}

export function AsksFetcher({
  ContainerComponent,
  SkeletonComponent,
  initialDate = new Date(),
}: AsksFetcherProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  // Форматируем дату для API (YYYY-MM-DD)
  const dateString = format(selectedDate, "yyyy-MM-dd");

  const { data, isLoading, isFetching, error } = useAsksByDateQuery({
    date: dateString,
  });

  if (isLoading) return <SkeletonComponent />;

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
    <ContainerComponent
      data={data}
      isFetching={isFetching}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
}
