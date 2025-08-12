import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { PalletDetailContainer } from "@/modules/pallets/components/containers/pallet-detail/container";
import { PalletActionsMenu } from "@/modules/pallets/components/pallet-actions-menu";
import { useParams } from "react-router";

export function Pallet() {
  const { title } = useParams<{ title: string }>();

  const handleRename = () => {
    console.log("Переименовать паллету:", title);
    // TODO: Реализовать диалог переименования
  };

  const handleClear = () => {
    console.log("Очистить паллету:", title);
    // TODO: Реализовать диалог очистки
  };

  const handleMove = () => {
    console.log("Переставить паллету:", title);
    // TODO: Реализовать диалог перестановки
  };

  const handleDelete = () => {
    console.log("Удалить паллету:", title);
    // TODO: Реализовать диалог удаления
  };

  return (
    <SidebarInsetLayout
      headerText={`Палета: ${title || "невідома"}`}
      burger={
        <PalletActionsMenu
          onRename={handleRename}
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
