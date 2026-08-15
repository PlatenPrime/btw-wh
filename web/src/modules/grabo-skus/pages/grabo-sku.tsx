import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import {
  GraboSkuContainer,
  GraboSkuContainerSkeleton,
} from "@/modules/grabo-skus/components/containers/grabo-sku-container";
import { GraboSkuFetcher } from "@/modules/grabo-skus/components/fetchers/grabo-sku-fetcher";
import { useParams } from "react-router";

export function GraboSku() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Товар Grabo">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор товару не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Товар Grabo">
      <main className="p-4">
        <GraboSkuFetcher
          id={id}
          ContainerComponent={GraboSkuContainer}
          SkeletonComponent={GraboSkuContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
