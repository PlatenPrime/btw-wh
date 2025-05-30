import { ArtCardContainer } from "@/components/modules/arts/components/ArtCardContainer";
import { BtradeArtInfoContainer } from "@/components/modules/arts/components/BtradeArtInfoContainer";
import { SidebarInsetLayout } from "@/components/sidebar-inset-layout";

export function Art() {
  return (
    <SidebarInsetLayout headerText="Артикул">
      <main className=" p-4">
        <ArtCardContainer />
        <BtradeArtInfoContainer />
      </main>
    </SidebarInsetLayout>
  );
}
