import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { PalletFetcher } from "@/modules/pallets/components/fetchers";
import { PalletContainer, PalletContainerSkeleton } from "@/modules/pallets/components/containers/pallet-container";
import { useParams } from "react-router";

export function Pallet() {
  const { title } = useParams<{ title: string }>();

  return (
    <SidebarInsetLayout headerText={`Палета: ${title || "невідома"}`}>
      <main className="p-4">
        <PalletFetcher
          palletTitle={title}
          ContainerComponent={PalletContainer}
          SkeletonComponent={PalletContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}

export default Pallet;
