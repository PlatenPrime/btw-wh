import { SidebarInsetLayout } from "@/components/sidebar-inset-layout";
import { ArtCardContainer } from "@/modules/arts/components/art-info/ArtCardContainer";
import { BtradeArtInfoContainer } from "@/modules/arts/components/art-info/BtradeArtInfoContainer";

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
