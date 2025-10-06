import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import { PalletControl } from "@/modules/pallets/components/controls/pallet-control/PalletControl";
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
    <div className="grid gap-2">
      <Container className="flex flex-wrap items-center justify-between gap-2">
        <CreatePosDialog
          pallet={pallet}
          onSuccess={handlePosCreated}
          trigger={<Button variant="outline">Додати позицію</Button>}
        />
        <PalletInfo pallet={pallet} />
        <PalletControl pallet={pallet} />
      </Container>

      <PosesByPalletFetcher
        palletId={pallet._id}
        ContainerComponent={PosesByPalletContainer}
        SkeletonComponent={PosesByPalletContainerSkeleton}
        newPosIds={newPosIds}
      />
    </div>
  );
}
