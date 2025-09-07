import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="">
        <h1 className="text-center text-3xl font-bold md:text-3xl lg:text-6xl">
          Btrade Warehouse App
        </h1>
 <ArtGridCardSkeleton/>
      </main>
    </SidebarInsetLayout>
  );
}
