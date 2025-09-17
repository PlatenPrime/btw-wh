import { PosInPalletCardView } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCardView.tsx";
import type { IPos } from "@/modules/poses/api/types";

interface PosInPalletCardProps {
  pos: IPos;
}

export function PosInPalletCard({ pos }: PosInPalletCardProps) {
  return <PosInPalletCardView pos={pos} />;
}
