import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletInRowCardSkeleton } from "@/modules/pallets/components/cards/pallet-in-row-card/PalletInRowCardSkeleton.tsx";
import { PalletInRowCardView } from "@/modules/pallets/components/cards/pallet-in-row-card/PalletInRowCardView.tsx";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletInRowCard({ pallet, rowId }: PalletInRowCardProps) {
  return <PalletInRowCardView pallet={pallet} rowId={rowId} />;
}

export { PalletInRowCardSkeleton };
