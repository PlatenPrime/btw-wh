import { ThemedBox, ThemedButton, ThemedHStack, ThemedText as ThemedTextButton } from "@/components/themed";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { PosesByPalletFetcher } from "@/modules/poses/components/fetchers/poses-by-pallet-fetcher/PosesByPalletFetcher";
import { PalletSortControls } from "./components/PalletSortControls";

interface PalletContainerViewProps {
  pallet: IPallet;
  handlePosCreated: () => void;
  sortParams: GetPosesByPalletIdParams;
  onSortParamsChange: (params: GetPosesByPalletIdParams) => void;
  onCreatePosClick: () => void;
}

export function PalletContainerView({
  pallet,
  handlePosCreated,
  sortParams,
  onSortParamsChange,
  onCreatePosClick,
}: PalletContainerViewProps) {
  return (
    <ThemedBox className="flex-1">
      <ThemedBox className="p-4 gap-4 ">
        <ThemedHStack className="items-center justify-between gap-4 flex-wrap">
          <PalletSortControls
            sortParams={sortParams}
            onSortParamsChange={onSortParamsChange}
          />
          <ThemedButton
            onPress={onCreatePosClick}
            className="rounded-lg"
            variant="create"
          >
            <ThemedTextButton className="text-white font-semibold text-base">
              Додати позицію
            </ThemedTextButton>
          </ThemedButton>
          <PalletInfo pallet={pallet} />
        </ThemedHStack>
      </ThemedBox>

      <PosesByPalletFetcher palletId={pallet._id} sortParams={sortParams} />
    </ThemedBox>
  );
}
