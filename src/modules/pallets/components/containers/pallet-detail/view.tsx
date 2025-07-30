import { PosesInPalletList } from "@/modules/poses/components/containers/poses-in-pallet-list";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/cards/pallet-info";

interface PalletDetailViewProps {
  pallet: IPallet;
}

export function PalletDetailView({ pallet }: PalletDetailViewProps) {
  return (
    <div className="grid gap-4">
      <PalletInfo pallet={pallet} />
      <PosesInPalletList poses={pallet.poses} />
    </div>
  );
}
