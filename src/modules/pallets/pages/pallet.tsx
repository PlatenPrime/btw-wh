import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { PalletDetailContainer } from "@/modules/pallets/components/containers/pallet-detail/container";
import { useParams } from "react-router";

export function Pallet() {
  const { title } = useParams<{ title: string }>();
  
  return (
    <SidebarInsetLayout headerText={`Палет: ${title || "невідомий"}`}>
      <main className="p-4">
        <PalletDetailContainer />
      </main>
    </SidebarInsetLayout>
  );
}

export default Pallet;
