import { useDebounce } from "@/hooks/useDebounce";
import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailHeaderActions } from "@/modules/prods/components/actions/prod-detail-header-actions";
import { ProdContainerView } from "@/modules/prods/components/containers/prod-container/ProdContainerView";
import { AnalogsByProdContainer } from "@/modules/analogs/components/containers/analogs-by-prod-container";
import { AnalogsContainerSkeleton } from "@/modules/analogs/components/containers/analogs-container";
import { AnalogsByProdFetcher } from "@/modules/analogs/components/fetchers/analogs-by-prod-fetcher";
import { useAnalogsByProdParams } from "@/modules/analogs/hooks/useAnalogsByProdParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useEffect, useState } from "react";

interface ProdContainerProps {
  prod: ProdDto;
}

export function ProdContainer({ prod }: ProdContainerProps) {
  const { page, limit, search, setPage, setLimit, setSearch } =
    useAnalogsByProdParams();
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, search, setSearch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  return (
    <>
      <ProdDetailHeaderActions prod={prod} />
      <ProdContainerView
        prod={prod}
        search={localSearch}
        onSearchChange={(e) => setLocalSearch(e.target.value)}
        limit={limit}
        setLimit={setLimit}
      >
        <AnalogsByProdFetcher
          prodName={prod.name}
          params={{ page, limit, search: debouncedSearch || undefined }}
          ContainerComponent={({ data }) => (
            <AnalogsByProdContainer
              data={data}
              konks={konks}
              prods={prods}
              onPageChange={setPage}
            />
          )}
          SkeletonComponent={AnalogsContainerSkeleton}
        />
      </ProdContainerView>
    </>
  );
}
