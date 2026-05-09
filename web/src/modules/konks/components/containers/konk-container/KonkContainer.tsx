import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { KonkDto } from "@/modules/konks/api/types";
import { KonkContainerView } from "@/modules/konks/components/containers/konk-container/KonkContainerView";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useSkusByKonkParams } from "@/modules/skus/hooks/useSkusByKonkParams";

interface KonkContainerProps {
  konk: KonkDto;
}

export function KonkContainer({ konk }: KonkContainerProps) {
  const { hasRole } = useAuth();
  const canViewSkuCatalog = hasRole(RoleType.ADMIN);

  const {
    page: skuPage,
    limit: skuLimit,
    prodName: skuProdName,
    search,
    setPage: setSkuPage,
    setLimit: setSkuLimit,
    setProdName: setSkuProdName,
    setSearch,
  } = useSkusByKonkParams();

  const prodsQuery = useProdsQuery({ enabled: canViewSkuCatalog });
  const prods = prodsQuery.data?.data ?? [];

  return (
    <KonkContainerView
      konk={konk}
      showSkuCatalogSection={canViewSkuCatalog}
      prods={prods}
      skuPage={skuPage}
      skuLimit={skuLimit}
      skuProdName={skuProdName}
      search={search}
      onSkuPageChange={setSkuPage}
      onSkuLimitChange={setSkuLimit}
      onSkuProdNameChange={setSkuProdName}
      onSearchChange={setSearch}
    />
  );
}
