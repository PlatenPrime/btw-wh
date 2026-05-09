import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailHeaderActions } from "@/modules/prods/components/actions/prod-detail-header-actions";
import { ProdContainerView } from "@/modules/prods/components/containers/prod-container/ProdContainerView";
import { useAnalogsByProdParams } from "@/modules/analogs/hooks/useAnalogsByProdParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import type { KonkDto } from "@/modules/konks/api/types";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { CompetitorSkusContainer } from "@/modules/skus/components/containers/competitor-skus-container/CompetitorSkusContainer";
import { SkusContainerSkeleton } from "@/modules/skus/components/containers/skus-by-konk-container/SkusContainerSkeleton";
import { CompetitorSkusFetcher } from "@/modules/skus/components/fetchers/competitor-skus-fetcher/CompetitorSkusFetcher";

interface ProdContainerProps {
  prod: ProdDto;
}

export function ProdContainer({ prod }: ProdContainerProps) {
  const {
    page,
    limit,
    search,
    konkName,
    setPage,
    setLimit,
    setSearch,
    setKonkName,
  } =
    useAnalogsByProdParams();

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];
  const selectedKonk = resolveSelectedKonk(konks, konkName);

  return (
    <>
      <ProdDetailHeaderActions prod={prod} />
      <ProdContainerView
        prod={prod}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        konkName={konkName}
        onKonkNameChange={setKonkName}
        konks={konks}
        isKonksLoading={konksQuery.isLoading}
        limit={limit}
        setLimit={setLimit}
      >
        <CompetitorSkusFetcher
          params={{
            page,
            limit,
            search: search || undefined,
            prodName: prod.name,
            konkName: konkName || undefined,
          }}
          ContainerComponent={({ data }) => (
            <CompetitorSkusContainer
              data={data}
              konks={selectedKonk ? [selectedKonk] : konks}
              prods={prods}
              onPageChange={setPage}
            />
          )}
          SkeletonComponent={SkusContainerSkeleton}
        />
      </ProdContainerView>
    </>
  );
}

function resolveSelectedKonk(konks: KonkDto[], konkName: string) {
  if (!konkName) return undefined;
  return konks.find((konk) => konk.name === konkName);
}
