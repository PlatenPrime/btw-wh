import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsListEmpty } from "./PalletsListEmpty";
import { PalletsListView } from "./PalletsListView";

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
