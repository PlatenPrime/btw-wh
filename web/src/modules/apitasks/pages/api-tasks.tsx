import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { ApiTasksListContainer } from "@/modules/apitasks/components/containers/api-tasks-list";

export function ApiTasksPage() {
  return (
    <SidebarInsetLayout headerText="Задачі">
      <main className="grid gap-2 p-2">
        <ApiTasksListContainer />
      </main>
    </SidebarInsetLayout>
  );
}
