import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  SkuContainer,
  SkuContainerSkeleton,
} from "@/modules/skus/components/containers/sku-container";
import { SkuFetcher } from "@/modules/skus/components/fetchers/sku-fetcher";
import { useParams } from "react-router";

export function Sku() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Товар конкурента (SKU)">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор товару не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Товар конкурента (SKU)">
      <main className="p-4">
        <SkuFetcher
          id={id}
          ContainerComponent={SkuContainer}
          SkeletonComponent={SkuContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
