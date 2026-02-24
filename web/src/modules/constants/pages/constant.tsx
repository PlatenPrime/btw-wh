import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  ConstantContainer,
  ConstantContainerSkeleton,
} from "@/modules/constants/components/containers/constant-container";
import { ConstantFetcher } from "@/modules/constants/components/fetchers/constant-fetcher";
import { useParams } from "react-router";

export function Constant() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Константа">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор константи не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Константа">
      <main className="p-4">
        <ConstantFetcher
          id={id}
          ContainerComponent={({ constant }) => (
            <ConstantContainer constant={constant} />
          )}
          SkeletonComponent={ConstantContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
