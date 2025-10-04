import { Button } from "@/components/ui/button";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletActions } from "@/modules/pallets/components/elements/pallet-actions/PalletActions.tsx";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import {
  PosesByPalletContainer,
  PosesByPalletContainerSkeleton,
} from "@/modules/poses/components/containers/poses-by-pallet-container";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { PosesByPalletFetcher } from "@/modules/poses/components/fetchers";
import { useState } from "react";

interface PalletContainerViewProps {
  pallet: PalletResponse;
  onPosCreated?: () => void;
}

export function PalletContainerView({
  pallet,
  onPosCreated,
}: PalletContainerViewProps) {
  const [newPosIds, setNewPosIds] = useState<string[]>([]);

  const handlePosCreated = (newPosId?: string) => {
    if (newPosId) {
      setNewPosIds((prev) => [...prev, newPosId]);
    }
    onPosCreated?.();
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PalletInfo pallet={pallet} />

        <CreatePosDialog
          pallet={pallet}
          onSuccess={handlePosCreated}
          trigger={<Button variant="outline">Додати позицію</Button>}
        />

        <PalletActions pallet={pallet} />
      </div>
      <PosesByPalletFetcher
        palletId={pallet._id}
        ContainerComponent={PosesByPalletContainer}
        SkeletonComponent={PosesByPalletContainerSkeleton}
        newPosIds={newPosIds}
      />
    </div>
  );
}
