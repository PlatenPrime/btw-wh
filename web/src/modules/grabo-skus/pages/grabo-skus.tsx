import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { GraboSkusHeaderActions } from "@/modules/grabo-skus/components/actions/grabo-skus-header-actions";
import { GraboSkusContainer } from "@/modules/grabo-skus/components/containers/grabo-skus-container/GraboSkusContainer";
import { GraboSkusContainerSkeleton } from "@/modules/grabo-skus/components/containers/grabo-skus-container/GraboSkusContainerSkeleton";
import { GraboSkusControls } from "@/modules/grabo-skus/components/controls/grabo-skus-controls/GraboSkusControls";
import { GraboSkusFetcher } from "@/modules/grabo-skus/components/fetchers/grabo-skus-fetcher/GraboSkusFetcher";
import { useGraboSkusParams } from "@/modules/grabo-skus/hooks/useGraboSkusParams";

export function GraboSkus() {
  const {
    page,
    limit,
    search,
    color,
    size,
    material,
    gas,
    language,
    gasCapacity,
    tag,
    isOnSite,
    isNewProduct,
    listQuery,
    setPage,
    setLimit,
    setSearch,
    setColor,
    setSize,
    setMaterial,
    setGas,
    setLanguage,
    setGasCapacity,
    setTag,
    setIsOnSite,
    setIsNewProduct,
  } = useGraboSkusParams();

  return (
    <SidebarInsetLayout headerText="Грабо">
      <GraboSkusHeaderActions />
      <div className="grid gap-2 p-2">
        <GraboSkusControls
          limit={limit}
          setLimit={setLimit}
          search={search}
          setSearch={setSearch}
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
          material={material}
          setMaterial={setMaterial}
          gas={gas}
          setGas={setGas}
          language={language}
          setLanguage={setLanguage}
          gasCapacity={gasCapacity}
          setGasCapacity={setGasCapacity}
          tag={tag}
          setTag={setTag}
          isOnSite={isOnSite}
          setIsOnSite={setIsOnSite}
          isNewProduct={isNewProduct}
          setIsNewProduct={setIsNewProduct}
        />

        <GraboSkusFetcher
          params={{
            page,
            limit,
            search,
            color: color || undefined,
            size: size || undefined,
            material: material || undefined,
            gas: gas || undefined,
            language: language || undefined,
            gasCapacity: gasCapacity || undefined,
            tag: tag || undefined,
            isOnSite: listQuery.isOnSite,
            isNewProduct: listQuery.isNewProduct,
          }}
          ContainerComponent={({ data }) => (
            <GraboSkusContainer data={data} onPageChange={setPage} />
          )}
          SkeletonComponent={GraboSkusContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}
