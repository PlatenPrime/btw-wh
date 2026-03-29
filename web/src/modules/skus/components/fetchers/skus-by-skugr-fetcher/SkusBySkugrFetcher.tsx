import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { useDebounce } from "@/hooks/useDebounce";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useSkugrPageByIdQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrPageByIdQuery";
import { useSkusBySkugrQuery } from "@/modules/skus/api/hooks/queries/useSkusBySkugrQuery";
import { SkusContainerSkeleton } from "@/modules/skus/components/containers/skus-by-konk-container/SkusContainerSkeleton";
import { SkusBySkugrContainer } from "@/modules/skus/components/containers/skus-by-skugr-container";
import { useSkusBySkugrParams } from "@/modules/skus/hooks/useSkusBySkugrParams";
import { useEffect, useMemo, useState } from "react";

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
  const [localSearch, setLocalSearch] = useState(grSearch);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== grSearch) {
      setGrSearch(debouncedSearch);
    }
  }, [debouncedSearch, grSearch, setGrSearch]);

  useEffect(() => {
    setLocalSearch(grSearch);
  }, [grSearch]);

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
    search: debouncedSearch || undefined,
    enabled: Boolean(skugrMeta),
  });
  const { data, isLoading, error } = skusQuery;

  if (skugrMetaQuery.isError) {
    return (
      <Wrapper className="grid gap-2">
        <h2 className="text-lg font-semibold">Товари в групі</h2>
        <ErrorDisplay
          error={skugrMetaQuery.error}
          title="Помилка завантаження групи"
          description="Не вдалося отримати дані товарної групи для списку SKU"
        />
      </Wrapper>
    );
  }

  if (skugrMetaQuery.isPending || !skugrMeta) {
    return (
      <Wrapper className="grid gap-2">
        <h2 className="text-lg font-semibold">Товари в групі</h2>
        <SkusContainerSkeleton />
      </Wrapper>
    );
  }

  const controls = (
    <>
      <h2 className="text-lg font-semibold">Товари в групі</h2>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="grid min-w-0 flex-1 gap-1">
          <SearchPanel
            search={localSearch}
            onSearchChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Пошук за назвою товару..."
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <SelectLimit
            limitOptions={[10, 20, 50, 100]}
            limit={grLimit}
            setLimit={setGrLimit}
          />
        </div>
      </div>
    </>
  );

  if (data) {
    if (error) {
      return (
        <Wrapper className="grid gap-2">
          {controls}
          <ErrorDisplay
            error={error}
            title="Помилка завантаження товарів групи"
            description="Не вдалося завантажити список SKU цієї товарної групи"
          />
        </Wrapper>
      );
    }
    if (!data.data?.length && !skusQuery.isFetching) {
      return (
        <Wrapper className="grid gap-2">
          {controls}
          <LoadingNoData description="У групі немає товарів за цими фільтрами" />
        </Wrapper>
      );
    }
    return (
      <Wrapper className="grid gap-2">
        {controls}
        <SkusBySkugrContainer
          data={data}
          konk={konk}
          prods={prods}
          onPageChange={setGrPage}
        />
      </Wrapper>
    );
  }

  if (isLoading) {
    return (
      <Wrapper className="grid gap-2">
        {controls}
        <SkusContainerSkeleton />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper className="grid gap-2">
        {controls}
        <ErrorDisplay
          error={error}
          title="Помилка завантаження товарів групи"
          description="Не вдалося завантажити список SKU цієї товарної групи"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="grid gap-2">
      {controls}
      <LoadingNoData description="У групі немає товарів за цими фільтрами" />
    </Wrapper>
  );
}
