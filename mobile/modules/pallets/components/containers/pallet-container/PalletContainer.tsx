import type { IPallet } from "@/modules/pallets/api/types";
import { PalletHeaderActions } from "@/modules/pallets/components/actions/pallet-header-actions";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { useState } from "react";
import { PalletContainerView } from "./PalletContainerView";

interface PalletContainerProps {
  pallet: IPallet;
  onPosCreated?: () => void;
}

export function PalletContainer({
  pallet,
  onPosCreated,
}: PalletContainerProps) {
  const [sortParams, setSortParams] = useState<GetPosesByPalletIdParams>({
    sortBy: "updatedAt",
    sortOrder: "desc",
  });

  const [createPosDialogOpen, setCreatePosDialogOpen] = useState(false);

  const handlePosCreated = () => {
    onPosCreated?.();
  };

  return (
    <>
      <PalletHeaderActions pallet={pallet} />
      <PalletContainerView
        pallet={pallet}
        handlePosCreated={handlePosCreated}
        sortParams={sortParams}
        onSortParamsChange={setSortParams}
        onCreatePosClick={() => setCreatePosDialogOpen(true)}
      />
      <CreatePosDialog
        pallet={pallet}
        open={createPosDialogOpen}
        onOpenChange={setCreatePosDialogOpen}
        onSuccess={handlePosCreated}
      />
    </>
  );
}
