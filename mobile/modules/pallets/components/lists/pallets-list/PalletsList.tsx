import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsListView } from "./PalletsListView";

interface PalletsListProps {
  pallets: PalletShortDto[] | undefined;
  rowId: string;
}

export function PalletsList({ pallets, rowId }: PalletsListProps) {
  return <PalletsListView pallets={pallets} rowId={rowId} />;
}

