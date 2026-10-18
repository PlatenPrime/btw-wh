import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfoView } from "@/modules/pallets/components/elements/pallet-info/PalletInfoView.tsx";

interface PalletInfoProps {
  pallet: IPallet;
}

export function PalletInfo({ pallet }: PalletInfoProps) {
  const totalPositions = pallet.poses.length;

  const totalBoxes = pallet.poses.reduce(
    (sum, pos) => sum + (pos.boxes || 0),
    0,
  );

  const palgrId =
    typeof pallet.palgr?.id === "string"
      ? pallet.palgr.id
      : pallet.palgr?.id != null
        ? String(pallet.palgr.id)
        : undefined;

  return (
    <PalletInfoView
      totalPositions={totalPositions}
      totalBoxes={totalBoxes}
      palgrId={palgrId}
      palgrTitle={pallet.palgr?.title}
    />
  );
}
