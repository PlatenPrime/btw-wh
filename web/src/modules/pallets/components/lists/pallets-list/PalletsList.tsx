import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsListEmpty } from "@/modules/pallets/components/lists/pallets-list/PalletsListEmpty.tsx";
import { PalletsListView } from "@/modules/pallets/components/lists/pallets-list/PalletsListView.tsx";

interface PalletsListProps {
  pallets: PalletShortDto[];
  rowId: string;
}

export function PalletsList({ pallets, rowId }: PalletsListProps) {
  if (!pallets.length) {
    return <PalletsListEmpty />;
  }

  return <PalletsListView pallets={pallets} rowId={rowId} />;
}
