import { PageSection } from "@/components/shared/layout";
import { SearchFiltersLayout } from "@/components/shared/search/search-filters-layout";
import { SearchPanel } from "@/components/shared/search/search-panel/SearchPanel";
import { SurfaceSection } from "@/components/shared/layout";
import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailHeaderActions } from "@/modules/konks/components/actions/konk-detail-header-actions";
import { KonkDetailsCard } from "@/modules/konks/components/cards/konk-details-card";
import { KonkSkusControls } from "@/modules/konks/components/controls/konk-skus-controls";
import type { ProdDto } from "@/modules/prods/api/types/dto";
import {
  SkusByKonkContainer,
  SkusContainerSkeleton,
} from "@/modules/skus/components/containers/skus-by-konk-container";
import { SkusByKonkFetcher } from "@/modules/skus/components/fetchers/skus-by-konk-fetcher";

interface KonkContainerViewProps {
  konk: KonkDto;
  /** Список SKU та фільтри — API ≥ ADMIN */
  showSkuCatalogSection?: boolean;
  prods: ProdDto[];
  skuPage: number;
  skuLimit: number;
  skuProdName: string;
  search: string;
  onSkuPageChange: (page: number) => void;
  onSkuLimitChange: (limit: number) => void;
  onSkuProdNameChange: (prodName: string) => void;
  onSearchChange: (search: string) => void;
}

export function KonkContainerView({
  konk,
  showSkuCatalogSection = true,
  prods,
  skuPage,
  skuLimit,
  skuProdName,
  search,
  onSkuPageChange,
  onSkuLimitChange,
  onSkuProdNameChange,
  onSearchChange,
}: KonkContainerViewProps) {
  return (
    <>
      <KonkDetailHeaderActions konk={konk} />
      <PageSection>
        <KonkDetailsCard konk={konk} />

        {showSkuCatalogSection ? (
        <SurfaceSection className="grid gap-2">
          <SearchFiltersLayout
            searchSlot={
              <div className="grid gap-1">
                <SearchPanel
                  search={search}
                  onSearchChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Пошук за назвою товару..."
                />
              </div>
            }
            filtersSlot={
              <KonkSkusControls
                prods={prods}
                prodName={skuProdName}
                setProdName={onSkuProdNameChange}
                limit={skuLimit}
                setLimit={onSkuLimitChange}
              />
            }
          />
          <SkusByKonkFetcher
            konkName={konk.name}
            params={{
              page: skuPage,
              limit: skuLimit,
              prodName: skuProdName || undefined,
              search: search || undefined,
            }}
            ContainerComponent={({ data }) => (
              <SkusByKonkContainer
                data={data}
                konk={konk}
                prods={prods}
                onPageChange={onSkuPageChange}
              />
            )}
            SkeletonComponent={SkusContainerSkeleton}
          />
        </SurfaceSection>
        ) : null}
      </PageSection>
    </>
  );
}
