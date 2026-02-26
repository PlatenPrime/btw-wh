import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  AnalogContainer,
  AnalogContainerSkeleton,
} from "@/modules/analogs/components/containers/analog-container";
import { AnalogFetcher } from "@/modules/analogs/components/fetchers/analog-fetcher";
import { useParams } from "react-router";

export function Analog() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Аналог">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор аналога не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Аналог">
      <main className="p-4">
        <AnalogFetcher
          id={id}
          ContainerComponent={AnalogContainer}
          SkeletonComponent={AnalogContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
