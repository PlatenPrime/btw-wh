import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsByRowContainerView } from "@/modules/pallets/components/containers/pallets-by-row-container/PalletsByRowContainerView";

interface PalletsByRowContainerProps {
  pallets: PalletShortDto[];
  rowId: string;
}

export function PalletsByRowContainer({
  pallets,
  rowId,
}: PalletsByRowContainerProps) {
  return <PalletsByRowContainerView pallets={pallets} rowId={rowId} />;
}
