import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsByRowContainerView } from "./PalletsByRowContainerView";

interface PalletsByRowContainerProps {
  pallets: PalletShortDto[] | undefined;
  rowId: string;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PalletsByRowContainer({
  pallets,
  rowId,
  isLoading,
  refreshing,
  onRefresh,
}: PalletsByRowContainerProps) {
  return (
    <PalletsByRowContainerView
      pallets={pallets}
      rowId={rowId}
      isLoading={isLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

