import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  ProdContainer,
  ProdContainerSkeleton,
} from "@/modules/prods/components/containers/prod-container";
import { ProdFetcher } from "@/modules/prods/components/fetchers/prod-fetcher";
import { useParams } from "react-router";

export function Prod() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Виробник">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор виробника не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Виробник">
      <main className="p-4">
        <ProdFetcher
          id={id}
          ContainerComponent={({ prod }) => <ProdContainer prod={prod} />}
          SkeletonComponent={ProdContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
