import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletHeaderActions } from "@/modules/pallets/components/actions/pallet-header-actions";
import { PalletContainerView } from "@/modules/pallets/components/containers/pallet-container/PalletContainerView.tsx";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { useState } from "react";

interface PalletContainerProps {
  pallet: PalletResponse;
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

  const handlePosCreated = () => {
    onPosCreated?.();
  };

  return (
    <>
      <PalletHeaderActions pallet={pallet.data!} />
      <PalletContainerView
        pallet={pallet}
        handlePosCreated={handlePosCreated}
        sortParams={sortParams}
        onSortParamsChange={setSortParams}
      />
    </>
  );
}
