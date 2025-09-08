import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletInRowCard } from "../../cards/pallet-in-row-card/PalletInRowCard";

interface PalletsListViewProps {
  pallets: PalletShortDto[];
  rowId: string;
}

export function PalletsListView({ pallets, rowId }: PalletsListViewProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {pallets.map((pallet) => (
        <PalletInRowCard key={pallet._id} pallet={pallet} rowId={rowId} />
      ))}
    </div>
  );
}
