import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfoView } from "./view";

interface PalletInfoProps {
  pallet: IPallet;
}

export function PalletInfo({ pallet }: PalletInfoProps) {
  const totalPositions = pallet.poses.length;

  const totalBoxes = pallet.poses.reduce(
    (sum, pos) => sum + (pos.boxes || 0),
    0,
  );

  return (
    <PalletInfoView totalPositions={totalPositions} totalBoxes={totalBoxes} />
  );
}
