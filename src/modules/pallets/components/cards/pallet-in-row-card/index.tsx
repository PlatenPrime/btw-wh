import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { PalletInRowCardView } from "./view";

interface PalletInRowCardProps {
  pallet: PalletShortDto;
 
}


export function PalletInRowCard({ pallet }: PalletInRowCardProps) {
  return <PalletInRowCardView pallet={pallet} />;
}

