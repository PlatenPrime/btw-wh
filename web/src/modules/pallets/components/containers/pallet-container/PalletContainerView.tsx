import { DetailPanelCard } from "@/components/shared/cards";
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
      <DetailPanelCard className="p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex w-full justify-start sm:order-2 sm:min-w-0 sm:w-auto sm:flex-1 sm:justify-center">
            <PalletInfo pallet={pallet.data!} />
          </div>

          <div className="flex w-full items-center justify-between gap-3 sm:contents">
            <div className="sm:order-1">
              <PalletSortControls
                sortParams={sortParams}
                onSortParamsChange={onSortParamsChange}
              />
            </div>

            <div className="shrink-0 sm:order-3">
              <CreatePosDialog
                pallet={pallet.data!}
                onSuccess={handlePosCreated}
                trigger={
                  <Button variant="outline" className="w-fit shrink-0">
                    + Додати позицію
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </DetailPanelCard>

      <PosesByPalletFetcher
        palletId={pallet.data!._id}
        ContainerComponent={PosesByPalletContainer}
        SkeletonComponent={PosesByPalletContainerSkeleton}
        sortParams={sortParams}
      />
    </div>
  );
}
