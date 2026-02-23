import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  KonkContainer,
  KonkContainerSkeleton,
} from "@/modules/konks/components/containers/konk-container";
import { KonkFetcher } from "@/modules/konks/components/fetchers/konk-fetcher";
import { useParams } from "react-router";

export function Konk() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Конкурент">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор конкурента не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Конкурент">
      <main className="p-4">
        <KonkFetcher
          id={id}
          ContainerComponent={({ konk }) => <KonkContainer konk={konk} />}
          SkeletonComponent={KonkContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
