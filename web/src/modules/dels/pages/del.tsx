import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  DelContainer,
  DelContainerSkeleton,
} from "@/modules/dels/components/containers/del-container";
import { DelFetcher } from "@/modules/dels/components/fetchers/del-fetcher";
import { useParams } from "react-router";

export function Del() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Поставка">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор поставки не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Поставка">
      <main>
        <DelFetcher
          id={id}
          ContainerComponent={({ del }) => <DelContainer del={del} />}
          SkeletonComponent={DelContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
