import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ask } from "@/modules/asks/components/asks-list-card/ask";
import { AsksListCard } from "@/modules/asks/components/asks-list-card/AsksListCard";
import { type AskDto } from "@/modules/asks/api/types/dto";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="">
        <h1 className="text-center text-3xl font-bold md:text-3xl lg:text-6xl">
          Btrade Warehouse App
        </h1>
        <AsksListCard ask={ask as AskDto} />
      </main>
    </SidebarInsetLayout>
  );
}
