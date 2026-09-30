import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import {
  ApiTaskDetailContainer,
  ApiTaskDetailContainerSkeleton,
} from "@/modules/apitasks/components/containers/api-task-detail";
import { ApiTaskFetcher } from "@/modules/apitasks/components/fetchers/api-task-fetcher";
import { useParams } from "react-router";

export function ApiTaskPage() {
  const { taskId } = useParams<{ taskId: string }>();

  if (!taskId) {
    return (
      <SidebarInsetLayout headerText="Задача">
        <main className="grid gap-2 p-2">
          <p className="text-muted-foreground text-center">
            Ідентифікатор задачі не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Задача">
      <main className="grid gap-2 p-2">
        <ApiTaskFetcher
          taskId={taskId}
          ContainerComponent={ApiTaskDetailContainer}
          SkeletonComponent={ApiTaskDetailContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
