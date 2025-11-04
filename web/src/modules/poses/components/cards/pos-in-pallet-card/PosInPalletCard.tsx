import type { IPos } from "@/modules/poses/api/types";
import { PosInPalletCardView } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCardView.tsx";

interface PosInPalletCardProps {
  pos: IPos;
}

export function PosInPalletCard({ pos }: PosInPalletCardProps) {
  return <PosInPalletCardView pos={pos} />;
}
