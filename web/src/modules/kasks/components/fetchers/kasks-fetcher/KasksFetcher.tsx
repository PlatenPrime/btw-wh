import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { useKasksByDateQuery } from "@/modules/kasks/api/hooks/queries/useKasksByDateQuery";
import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";
import { format } from "date-fns";
import { useState } from "react";
import type { ComponentType } from "react";

interface KasksFetcherProps {
  ContainerComponent: ComponentType<{
    data: GetKasksByDateResponse;
    isFetching: boolean;
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  }>;
  SkeletonComponent: ComponentType;
  initialDate?: Date;
}

export function KasksFetcher({
  ContainerComponent,
  SkeletonComponent,
  initialDate = new Date(),
}: KasksFetcherProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const dateString = format(selectedDate, "yyyy-MM-dd");

  const query = useKasksByDateQuery({ date: dateString });

  if (query.isLoading) return <SkeletonComponent />;

  if (query.error) {
    return (
      <ErrorDisplay
        error={query.error}
        title="Помилка завантаження"
        description="Не вдалося завантажити запити до каси за обрану дату"
      />
    );
  }

  if (!query.data) {
    return <LoadingNoData description="Немає даних" />;
  }

  return (
    <ContainerComponent
      data={query.data}
      isFetching={query.isFetching}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
}
