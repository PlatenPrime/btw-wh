import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import type { RowRefetch } from "@/modules/rows/api/types/types";
import { PalletInRowCardView } from "./PalletInRowCardView";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
  refetch: RowRefetch;
  rowId: string;
}

export function PalletInRowCard({
  pallet,
  refetch,
  rowId,
}: PalletInRowCardProps) {
  return (
    <PalletInRowCardView pallet={pallet} refetch={refetch} rowId={rowId} />
  );
}
