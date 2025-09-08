import { Button } from "@/components/ui/button";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { PosesByPalletFetcher } from "@/modules/poses/components/fetchers";
import { PalletActions } from "../../elements/pallet-actions/PalletActions";

interface PalletContainerViewProps {
  pallet: PalletResponse;
  onPosCreated?: () => void;
}

export function PalletContainerView({
  pallet,
  onPosCreated,
}: PalletContainerViewProps) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PalletInfo pallet={pallet} />

        <CreatePosDialog
          pallet={pallet}
          onSuccess={onPosCreated}
          trigger={<Button variant="outline">Додати позицію</Button>}
        />

        <PalletActions pallet={pallet} />
      </div>
      <PosesByPalletFetcher palletId={pallet._id} />
    </div>
  );
}
