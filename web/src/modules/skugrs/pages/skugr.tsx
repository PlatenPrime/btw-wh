import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  SkugrContainer,
  SkugrContainerSkeleton,
} from "@/modules/skugrs/components/containers/skugr-container";
import { SkugrFetcher } from "@/modules/skugrs/components/fetchers/skugr-fetcher";
import { useParams } from "react-router";

export function Skugr() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Товарна група">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор групи не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Товарна група">
      <main className="p-4">
        <SkugrFetcher
          id={id}
          ContainerComponent={SkugrContainer}
          SkeletonComponent={SkugrContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
