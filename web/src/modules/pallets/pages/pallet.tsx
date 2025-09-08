import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { PalletFetcher } from "@/modules/pallets/components/fetchers";
import { useParams } from "react-router";

export function Pallet() {
  const { title } = useParams<{ title: string }>();

  return (
    <SidebarInsetLayout headerText={`Палета: ${title || "невідома"}`}>
      <main className="p-4">
        <PalletFetcher palletTitle={title} />
      </main>
    </SidebarInsetLayout>
  );
}

export default Pallet;
