import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { SearchFiltersLayout } from "@/components/shared/search-components/search-filters-layout";
import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useSkugrPageByIdQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrPageByIdQuery";
import { useSkusBySkugrQuery } from "@/modules/skus/api/hooks/queries/useSkusBySkugrQuery";
import { SkusContainerSkeleton } from "@/modules/skus/components/containers/skus-by-konk-container/SkusContainerSkeleton";
import { SkusBySkugrContainer } from "@/modules/skus/components/containers/skus-by-skugr-container";
import { useSkusBySkugrParams } from "@/modules/skus/hooks/useSkusBySkugrParams";
import { useMemo } from "react";

interface SkusBySkugrFetcherProps {
  skugrId: string;
}

export function SkusBySkugrFetcher({ skugrId }: SkusBySkugrFetcherProps) {
  const skugrMetaQuery = useSkugrPageByIdQuery({ id: skugrId });
  const {
    page: grPage,
    limit: grLimit,
    search: grSearch,
    setPage: setGrPage,
    setLimit: setGrLimit,
    setSearch: setGrSearch,
  } = useSkusBySkugrParams();

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const prods = prodsQuery.data?.data ?? [];

  const skugrMeta = skugrMetaQuery.data?.data;
  const konk = useMemo(() => {
    const konks = konksQuery.data?.data ?? [];
    if (!skugrMeta) return undefined;
    return konks.find((k) => k.name === skugrMeta.konkName);
  }, [konksQuery.data, skugrMeta]);

  const skusQuery = useSkusBySkugrQuery({
    skugrId,
    page: grPage,
    limit: grLimit,
    search: grSearch || undefined,
    enabled: Boolean(skugrMeta),
  });
  const { data, isLoading, error } = skusQuery;

  if (skugrMetaQuery.isError) {
    return (
      <SurfaceSection className="grid gap-2">
        <h2 className="text-lg font-semibold">Товари в групі</h2>
        <ErrorDisplay
          error={skugrMetaQuery.error}
          title="Помилка завантаження групи"
          description="Не вдалося отримати дані товарної групи для списку SKU"
        />
      </SurfaceSection>
    );
  }

  if (skugrMetaQuery.isPending || !skugrMeta) {
    return (
      <SurfaceSection className="grid gap-2">
        <h2 className="text-lg font-semibold">Товари в групі</h2>
        <SkusContainerSkeleton />
      </SurfaceSection>
    );
  }

  const controls = (
    <>
      <h2 className="text-lg font-semibold">Товари в групі</h2>
      <SearchFiltersLayout
        searchSlot={
          <div className="grid gap-1">
            <SearchPanel
              search={grSearch}
              onSearchChange={(e) => setGrSearch(e.target.value)}
              placeholder="Пошук за назвою товару..."
            />
          </div>
        }
        filtersSlot={
          <div className="flex flex-wrap items-center gap-2">
            <SelectLimit
              limitOptions={[10, 20, 50, 100]}
              limit={grLimit}
              setLimit={setGrLimit}
            />
          </div>
        }
      />
    </>
  );

  if (data) {
    if (error) {
      return (
        <SurfaceSection className="grid gap-2">
          {controls}
          <ErrorDisplay
            error={error}
            title="Помилка завантаження товарів групи"
            description="Не вдалося завантажити список SKU цієї товарної групи"
          />
        </SurfaceSection>
      );
    }
    if (!data.data?.length && !skusQuery.isFetching) {
      return (
        <SurfaceSection className="grid gap-2">
          {controls}
          <LoadingNoData description="У групі немає товарів за цими фільтрами" />
        </SurfaceSection>
      );
    }
    return (
      <SurfaceSection className="grid gap-2">
        {controls}
        <DataRefetchOverlay
          isFetching={skusQuery.isFetching}
          isLoading={skusQuery.isLoading}
        >
          <SkusBySkugrContainer
            data={data}
            konk={konk}
            prods={prods}
            onPageChange={setGrPage}
          />
        </DataRefetchOverlay>
      </SurfaceSection>
    );
  }

  if (isLoading) {
    return (
      <SurfaceSection className="grid gap-2">
        {controls}
        <SkusContainerSkeleton />
      </SurfaceSection>
    );
  }

  if (error) {
    return (
      <SurfaceSection className="grid gap-2">
        {controls}
        <ErrorDisplay
          error={error}
          title="Помилка завантаження товарів групи"
          description="Не вдалося завантажити список SKU цієї товарної групи"
        />
      </SurfaceSection>
    );
  }

  return (
    <SurfaceSection className="grid gap-2">
      {controls}
      <LoadingNoData description="У групі немає товарів за цими фільтрами" />
    </SurfaceSection>
  );
}
