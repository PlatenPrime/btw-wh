import { RoleType } from "@/constants/roles";
import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailHeaderActions } from "@/modules/prods/components/actions/prod-detail-header-actions";
import { ProdContainerView } from "@/modules/prods/components/containers/prod-container/ProdContainerView";
import { useAnalogsByProdParams } from "@/modules/analogs/hooks/useAnalogsByProdParams";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
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
  const { hasRole } = useAuth();
  const canViewCompetitorSkus = hasRole(RoleType.ADMIN);

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

  const konksQuery = useKonksQuery({ enabled: canViewCompetitorSkus });
  const prodsQuery = useProdsQuery({ enabled: canViewCompetitorSkus });
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];
  const selectedKonk = resolveSelectedKonk(konks, konkName);

  return (
    <>
      <ProdDetailHeaderActions prod={prod} />
      <ProdContainerView
        prod={prod}
        showCompetitorSkusSection={canViewCompetitorSkus}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        konkName={konkName}
        onKonkNameChange={setKonkName}
        konks={konks}
        isKonksLoading={konksQuery.isLoading}
        limit={limit}
        setLimit={setLimit}
      >
        {canViewCompetitorSkus ? (
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
        ) : null}
      </ProdContainerView>
    </>
  );
}

function resolveSelectedKonk(konks: KonkDto[], konkName: string) {
  if (!konkName) return undefined;
  return konks.find((konk) => konk.name === konkName);
}
