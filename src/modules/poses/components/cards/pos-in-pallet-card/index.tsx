import { PosInPalletCardView } from "./view";
import type { IPos } from "@/modules/poses/api";

interface PosInPalletCardProps {
  pos: IPos;
}

export function PosInPalletCard({ pos }: PosInPalletCardProps) {
  return <PosInPalletCardView pos={pos} />;
}