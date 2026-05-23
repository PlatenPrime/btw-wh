import { PageSection } from "@/components/shared/layout";
import { SearchFiltersLayout } from "@/components/shared/search-components/search-filters-layout";
import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { Skeleton } from "@/components/ui/skeleton";
import { KonkDetailsCardSkeleton } from "@/modules/konks/components/cards/konk-details-card";
import { SkusContainerSkeleton } from "@/modules/skus/components/containers/skus-by-konk-container/SkusContainerSkeleton";

export function KonkContainerSkeleton() {
  return (
    <PageSection>
      <KonkDetailsCardSkeleton />
      <SurfaceSection className="grid gap-2">
        <SearchFiltersLayout
          searchSlot={<Skeleton className="h-9 w-full" />}
          filtersSlot={
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-9 w-28" />
            </div>
          }
        />
        <SkusContainerSkeleton />
      </SurfaceSection>
    </PageSection>
  );
}
