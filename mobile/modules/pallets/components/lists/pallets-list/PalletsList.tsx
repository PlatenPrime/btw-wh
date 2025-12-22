import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsListView } from "./PalletsListView";

interface PalletsListProps {
  pallets: PalletShortDto[] | undefined;
  rowId: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PalletsList({
  pallets,
  rowId,
  refreshing,
  onRefresh,
}: PalletsListProps) {
  return (
    <PalletsListView
      pallets={pallets}
      rowId={rowId}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

