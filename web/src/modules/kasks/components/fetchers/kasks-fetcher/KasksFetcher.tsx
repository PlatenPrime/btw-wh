import { ContentReveal } from "@/components/shared/motion";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useKasksByDateQuery } from "@/modules/kasks/api/hooks/queries/useKasksByDateQuery";
import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";
import { useKasksParams } from "@/modules/kasks/hooks/useKasksParams";
import type { ComponentType } from "react";

interface KasksFetcherProps {
  ContainerComponent: ComponentType<{
    data: GetKasksByDateResponse;
    isFetching: boolean;
    selectedDate: Date;
    setDate: (date: Date) => void;
  }>;
  SkeletonComponent: ComponentType;
}

export function KasksFetcher({
  ContainerComponent,
  SkeletonComponent,
}: KasksFetcherProps) {
  const { selectedDate, dateString, setDate } = useKasksParams();

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
    <ContentReveal lockMotion={query.isFetching && !query.isLoading}>
      <ContainerComponent
        data={query.data}
        isFetching={query.isFetching}
        selectedDate={selectedDate}
        setDate={setDate}
      />
    </ContentReveal>
  );
}
