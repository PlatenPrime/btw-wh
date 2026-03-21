import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { AnalogsByKonkContainer } from "@/modules/analogs/components/containers/analogs-by-konk-container";
import { AnalogsContainerSkeleton } from "@/modules/analogs/components/containers/analogs-container";
import { AnalogsByKonkFetcher } from "@/modules/analogs/components/fetchers/analogs-by-konk-fetcher";
import { useAnalogsByKonkParams } from "@/modules/analogs/hooks/useAnalogsByKonkParams";
import type { KonkDto } from "@/modules/konks/api/types";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { KonkDetailHeaderActions } from "@/modules/konks/components/actions/konk-detail-header-actions";
import { KonkContainerView } from "@/modules/konks/components/containers/konk-container/KonkContainerView";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import {
  SkusByKonkContainer,
  SkusContainerSkeleton,
} from "@/modules/skus/components/containers/skus-by-konk-container";
import { SkusByKonkFetcher } from "@/modules/skus/components/fetchers/skus-by-konk-fetcher";
import { useSkusByKonkParams } from "@/modules/skus/hooks/useSkusByKonkParams";
import { useEffect, useState } from "react";

interface KonkContainerProps {
  konk: KonkDto;
}

export function KonkContainer({ konk }: KonkContainerProps) {
  const { page, limit, search, setPage, setLimit, setSearch } =
    useAnalogsByKonkParams();
  const {
    page: skuPage,
    limit: skuLimit,
    prodName: skuProdName,
    setPage: setSkuPage,
    setLimit: setSkuLimit,
    setProdName: setSkuProdName,
  } = useSkusByKonkParams();
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
      <div className="grid gap-2">
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

        <Wrapper className="grid gap-2">
          <h2 className="text-lg font-semibold">Товари конкурента</h2>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Select
              value={skuProdName || "all"}
              onValueChange={(v) => setSkuProdName(v === "all" ? "" : v)}
            >
              <SelectTrigger
                aria-label="Виробник"
                className="min-w-[140px] sm:min-w-[160px]"
              >
                <SelectValue placeholder="Усі виробники" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Усі виробники</SelectItem>
                {prods.map((p) => (
                  <SelectItem key={p._id} value={p.name}>
                    <EntityLabel
                      imageUrl={p.imageUrl}
                      title={p.title}
                      fallbackLabel={p.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <SelectLimit
              limitOptions={[10, 20, 50, 100]}
              limit={skuLimit}
              setLimit={setSkuLimit}
            />
          </div>
          <SkusByKonkFetcher
            konkName={konk.name}
            params={{
              page: skuPage,
              limit: skuLimit,
              prodName: skuProdName || undefined,
            }}
            ContainerComponent={({ data }) => (
              <SkusByKonkContainer
                data={data}
                konk={konk}
                prods={prods}
                onPageChange={setSkuPage}
              />
            )}
            SkeletonComponent={SkusContainerSkeleton}
          />
        </Wrapper>
      </div>
    </>
  );
}
