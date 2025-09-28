import { SidebarInsetLayout } from "@/components/shared/sidebar/sidebar-inset-layout";
import { DefControls } from "@/modules/defs/components/controls/def-controls/DefControls";
import { LatestDefsFetcher } from "@/modules/defs/components/fetchers/latest-defs-fetcher/LatestDefsFetcher";

export function Defs() {
  return (
    <SidebarInsetLayout headerText="Дефіцити">
      <main className="p-2 grid gap-2">
        <DefControls />
        <LatestDefsFetcher />
      </main>
    </SidebarInsetLayout>
  );
}
