import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
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

  return <ContainerComponent data={groupsQuery.data.data} />;
}
