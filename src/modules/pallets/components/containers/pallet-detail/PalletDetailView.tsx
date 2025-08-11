import { Button } from "@/components/ui/button";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/cards/pallet-info/PalletInfo";
import { PosesInPalletList } from "@/modules/poses/components/containers/poses-in-pallet-list/PosesInPalletList";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog";

interface PalletDetailViewProps {
  pallet: IPallet;
  onPosCreated?: () => void;
}

export function PalletDetailView({
  pallet,
  onPosCreated,
}: PalletDetailViewProps) {
  return (
    <div className="grid gap-4">
      <PalletInfo pallet={pallet} />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Позиції на палеті</h2>
        <CreatePosDialog
          pallet={pallet}
          onSuccess={onPosCreated}
          trigger={<Button>Додати позицію</Button>}
        />
      </div>
      <PosesInPalletList poses={pallet.poses} />
    </div>
  );
}
