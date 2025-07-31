import { PosInPalletCardView } from "./view";
import type { IPos } from "@/modules/poses/types";

interface PosInPalletCardProps {
  pos: IPos;
}

export function PosInPalletCard({ pos }: PosInPalletCardProps) {
  return <PosInPalletCardView pos={pos} />;
}