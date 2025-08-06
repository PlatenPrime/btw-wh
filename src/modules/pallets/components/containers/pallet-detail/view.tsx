import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/cards/pallet-info";
import { PosesInPalletList } from "@/modules/poses/components/containers/poses-in-pallet-list";
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
          trigger={
            <button className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              Додати позицію
            </button>
          }
        />
      </div>
      <PosesInPalletList poses={pallet.poses} />
    </div>
  );
}
