import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { usePalletGroupsQuery } from "@/modules/pallet-groups/api/hooks/queries/usePalletGroupsQuery";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import type { ComponentType } from "react";

interface PalletGroupsFetcherProps {
  ContainerComponent: ComponentType<{ data: PalletGroupDto[] }>;
  SkeletonComponent: ComponentType;
}

export function PalletGroupsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: PalletGroupsFetcherProps) {
  const groupsQuery = usePalletGroupsQuery();

  if (groupsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (groupsQuery.error) {
    return (
      <ErrorDisplay
        error={groupsQuery.error}
        title="Помилка завантаження груп палет"
        description="Не вдалося завантажити список груп палет"
      />
    );
  }

  if (!groupsQuery.data || !groupsQuery.data.data.length) {
    return <LoadingNoData description="Групи палет не знайдено" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={groupsQuery.isFetching}
      isLoading={groupsQuery.isLoading}
    >
      <ContainerComponent data={groupsQuery.data.data} />
    </DataRefetchOverlay>
  );
}
