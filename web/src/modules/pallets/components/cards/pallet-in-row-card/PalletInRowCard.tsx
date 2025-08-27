import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { PalletInRowCardView } from "./PalletInRowCardView";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletInRowCard({ pallet, rowId }: PalletInRowCardProps) {
  return <PalletInRowCardView pallet={pallet} rowId={rowId} />;
}
