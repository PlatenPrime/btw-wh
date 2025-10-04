import type { IPos } from "@/modules/poses/api/types";
import { PosInPalletCardView } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCardView.tsx";

interface PosInPalletCardProps {
  pos: IPos;
  isNew?: boolean;
}

export function PosInPalletCard({ pos, isNew = false }: PosInPalletCardProps) {
  return <PosInPalletCardView pos={pos} isNew={isNew} />;
}
