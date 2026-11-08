import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { SkuStockBandsHeaderActions } from "@/modules/sku-stock-bands/components/actions/sku-stock-bands-header-actions";
import {
  SkuStockBandsContainer,
  SkuStockBandsContainerSkeleton,
} from "@/modules/sku-stock-bands/components/containers/sku-stock-bands-container";
import { SkuStockBandsControls } from "@/modules/sku-stock-bands/components/controls/sku-stock-bands-controls";
import { SkuStockBandsFetcher } from "@/modules/sku-stock-bands/components/fetchers/sku-stock-bands-fetcher";
import { useSkuStockBandsListParams } from "@/modules/sku-stock-bands/hooks/useSkuStockBandsListParams";

export function SkuStockBands() {
  const { konkName, setKonkName } = useSkuStockBandsListParams();

  return (
    <SidebarInsetLayout headerText="Діапазони залишків">
      <div className="grid gap-2 p-2">
        <SkuStockBandsHeaderActions />
        <SkuStockBandsControls
          konkName={konkName}
          onKonkNameChange={setKonkName}
        />
        <SkuStockBandsFetcher
          konkName={konkName || undefined}
          ContainerComponent={({ data }) => (
            <SkuStockBandsContainer data={data} />
          )}
          SkeletonComponent={SkuStockBandsContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}
