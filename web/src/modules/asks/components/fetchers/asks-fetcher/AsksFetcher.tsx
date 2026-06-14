import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from '@/components/shared/errors';
import { LoadingNoData } from '@/components/shared/feedback/loading-states';
import { useAsksByDateQuery } from "@/modules/asks/api/hooks/queries/useAsksByDateQuery";
import { useAsksParams } from "@/modules/asks/hooks/useAsksParams";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

interface AsksFetcherProps {
  ContainerComponent: ComponentType<{
    data: GetAsksByDateResponse;
    isFetching: boolean;
    selectedDate: Date;
    setDate: (date: Date) => void;
  }>;
  SkeletonComponent: ComponentType;
}

export function AsksFetcher({
  ContainerComponent,
  SkeletonComponent,
}: AsksFetcherProps) {
  const { selectedDate, dateString, setDate } = useAsksParams();

  const asksQuery = useAsksByDateQuery({
    date: dateString,
  });

  if (asksQuery.isLoading) return <SkeletonComponent />;

  if (asksQuery.error)
    return (
      <ErrorDisplay
        error={asksQuery.error}
        title="Помилка завантаження запитів"
        description="Не вдалося завантажити запити для обраної дати"
      />
    );

  if (!asksQuery.data)
    return <LoadingNoData description="Немає даних для відображення" />;

  return (
    <DataRefetchOverlay
      isFetching={asksQuery.isFetching}
      isLoading={asksQuery.isLoading}
    >
      <ContainerComponent
        data={asksQuery.data}
        isFetching={asksQuery.isFetching}
        selectedDate={selectedDate}
        setDate={setDate}
      />
    </DataRefetchOverlay>
  );
}
