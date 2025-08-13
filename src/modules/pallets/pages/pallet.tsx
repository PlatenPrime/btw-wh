import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { PalletDetailContainer } from "@/modules/pallets/components/containers/pallet-detail/container";
import { PalletActionsMenu } from "@/modules/pallets/components/menus/pallet-actions-menu/PalletActionsMenu";
import { useParams } from "react-router";

export function Pallet() {
  const { title } = useParams<{ title: string }>();

  const handleClear = () => {
    console.log("Очистити палету:", title);
    // TODO: Реализовать диалог очистки
  };

  const handleMove = () => {
    console.log("Переставити палету:", title);
    // TODO: Реализовать диалог перестановки
  };

  const handleDelete = () => {
    console.log("Видалити палету:", title);
    // TODO: Реализовать диалог удаления
  };

  return (
    <SidebarInsetLayout
      headerText={`Палета: ${title || "невідома"}`}
      burger={
        <PalletActionsMenu
          onClear={handleClear}
          onMove={handleMove}
          onDelete={handleDelete}
        />
      }
    >
      <main className="p-4">
        <PalletDetailContainer />
      </main>
    </SidebarInsetLayout>
  );
}

export default Pallet;
