import { Container } from "@/components/shared/containers/Container";
import { Button } from "@/components/ui/button";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import {
  PosesByPalletContainer,
  PosesByPalletContainerSkeleton,
} from "@/modules/poses/components/containers/poses-by-pallet-container";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { PosesByPalletFetcher } from "@/modules/poses/components/fetchers";
import { PalletSortControls } from "./components/PalletSortControls";

interface PalletContainerViewProps {
  pallet: PalletResponse;
  handlePosCreated: () => void;
  sortParams: GetPosesByPalletIdParams;
  onSortParamsChange: (params: GetPosesByPalletIdParams) => void;
}

export function PalletContainerView({
  pallet,
  handlePosCreated,
  sortParams,
  onSortParamsChange,
}: PalletContainerViewProps) {
  return (
    <div className="grid gap-2">
      <Container className="grid gap-2">
        <div className="grid md:grid-cols-3 gap-2 place-content-center ">
          <PalletSortControls
            sortParams={sortParams}
            onSortParamsChange={onSortParamsChange}
          />
          <PalletInfo pallet={pallet.data!} />

          <CreatePosDialog
            pallet={pallet.data!}
            onSuccess={handlePosCreated}
            trigger={<Button variant="outline" className="w-fit md:justify-self-end justify-self-center ">+ Додати позицію</Button>}
          />
        </div>
      </Container>

      <PosesByPalletFetcher
        palletId={pallet.data!._id}
        ContainerComponent={PosesByPalletContainer}
        SkeletonComponent={PosesByPalletContainerSkeleton}
        sortParams={sortParams}
      />
    </div>
  );
}
