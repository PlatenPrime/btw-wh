import { PosInPalletCardView } from "./PosInPalletCardView";
import type { IPos } from "@/modules/poses/api/types";

interface PosInPalletCardProps {
  pos: IPos;
}

export function PosInPalletCard({ pos }: PosInPalletCardProps) {
  return <PosInPalletCardView pos={pos} />;
}
