import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { AskList } from "../components/containers/ask-list/AskList";

export function Asks() {
  return (
    <SidebarInsetLayout headerText="Запити">
      <main className=" p-4">
      <AskList />
      </main>
    </SidebarInsetLayout>
  );
}
