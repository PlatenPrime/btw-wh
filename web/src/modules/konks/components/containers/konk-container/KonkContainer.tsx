import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailHeaderActions } from "@/modules/konks/components/actions/konk-detail-header-actions";
import { KonkContainerView } from "@/modules/konks/components/containers/konk-container/KonkContainerView";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import {
  SkusByKonkContainer,
  SkusContainerSkeleton,
} from "@/modules/skus/components/containers/skus-by-konk-container";
import { SkusByKonkFetcher } from "@/modules/skus/components/fetchers/skus-by-konk-fetcher";
import { useSkusByKonkParams } from "@/modules/skus/hooks/useSkusByKonkParams";

interface KonkContainerProps {
  konk: KonkDto;
}

export function KonkContainer({ konk }: KonkContainerProps) {
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

  const prodsQuery = useProdsQuery();
  const prods = prodsQuery.data?.data ?? [];

  return (
    <>
      <KonkDetailHeaderActions konk={konk} />
      <div className="grid gap-2">
        <KonkContainerView konk={konk} />

        <Wrapper className="grid gap-2">
          <h2 className="text-lg font-semibold">Товари конкурента</h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="grid min-w-0 flex-1 gap-1">
              <SearchPanel
                search={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                placeholder="Пошук за назвою товару..."
              />
            </div>
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
                        imageSize="xs"
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
          </div>
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
