import { SidebarInsetLayout } from "@/components/shared/layout/SidebarInsetLayout";
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
        <main className="p-2">
          <div className="text-muted-foreground text-center">
            ID запиту не знайдено
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Запит">
      <main className="p-2">
        <AskFetcher
          id={id}
          ContainerComponent={AskContainer}
          SkeletonComponent={AskContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
