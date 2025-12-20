import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsByRowContainerView } from "./PalletsByRowContainerView";

interface PalletsByRowContainerProps {
  pallets: PalletShortDto[] | undefined;
  rowId: string;
  isLoading: boolean;
}

export function PalletsByRowContainer({
  pallets,
  rowId,
  isLoading,
}: PalletsByRowContainerProps) {
  return (
    <PalletsByRowContainerView pallets={pallets} rowId={rowId} isLoading={isLoading} />
  );
}

