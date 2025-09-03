import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { AsksFetcher } from "../components/fetchers/asks-fetcher/AsksFetcher";

export function Asks() {
  return (
    <SidebarInsetLayout headerText="Запити">
      <main className="p-4">
        <AsksFetcher />
      </main>
    </SidebarInsetLayout>
  );
}
