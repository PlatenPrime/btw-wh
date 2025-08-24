import { Button } from "@/components/ui/button";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/elements/pallet-info/PalletInfo";
import { PosesInPalletList } from "@/modules/poses/components/containers/poses-in-pallet-list/PosesInPalletList";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";

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
      
      <div className="flex items-center justify-between">
        
        <PalletInfo pallet={pallet} />
        <CreatePosDialog
          pallet={pallet}
          onSuccess={onPosCreated}
          trigger={<Button variant="outline">Додати позицію</Button>}
        />
      </div>
      <PosesInPalletList poses={pallet.poses} />
    </div>
  );
}
