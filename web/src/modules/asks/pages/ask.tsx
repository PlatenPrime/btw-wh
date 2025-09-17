import { SidebarInsetLayout } from "@/components/shared/sidebar/sidebar-inset-layout";
import {
  AskContainer,
  AskContainerSkeleton,
} from "@/modules/asks/components/containers/ask-container";
import { AskFetcher } from "@/modules/asks/components/fetchers/ask-fetcher";
import { useParams } from "react-router";

export function Ask() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Запит">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            ID запиту не знайдено
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Запит">
      <main className="p-4">
        <AskFetcher
          id={id}
          ContainerComponent={AskContainer}
          SkeletonComponent={AskContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
