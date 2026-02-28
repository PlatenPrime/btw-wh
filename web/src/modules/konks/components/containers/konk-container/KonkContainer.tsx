import { useDebounce } from "@/hooks/useDebounce";
import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailHeaderActions } from "@/modules/konks/components/actions/konk-detail-header-actions";
import { KonkContainerView } from "@/modules/konks/components/containers/konk-container/KonkContainerView";
import { AnalogsByKonkContainer } from "@/modules/analogs/components/containers/analogs-by-konk-container";
import { AnalogsContainerSkeleton } from "@/modules/analogs/components/containers/analogs-container";
import { AnalogsByKonkFetcher } from "@/modules/analogs/components/fetchers/analogs-by-konk-fetcher";
import { useAnalogsByKonkParams } from "@/modules/analogs/hooks/useAnalogsByKonkParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useEffect, useState } from "react";

interface KonkContainerProps {
  konk: KonkDto;
}

export function KonkContainer({ konk }: KonkContainerProps) {
  const { page, limit, search, setPage, setLimit, setSearch } =
    useAnalogsByKonkParams();
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
      <KonkDetailHeaderActions konk={konk} />
      <KonkContainerView
        konk={konk}
        search={localSearch}
        onSearchChange={(e) => setLocalSearch(e.target.value)}
        limit={limit}
        setLimit={setLimit}
      >
        <AnalogsByKonkFetcher
          konkName={konk.name}
          params={{ page, limit, search: debouncedSearch || undefined }}
          ContainerComponent={({ data }) => (
            <AnalogsByKonkContainer
              data={data}
              konks={konks}
              prods={prods}
              onPageChange={setPage}
            />
          )}
          SkeletonComponent={AnalogsContainerSkeleton}
        />
      </KonkContainerView>
    </>
  );
}
