import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
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
}

export function PalletContainerView({
  pallet,
  handlePosCreated,
  sortParams,
  onSortParamsChange,
}: PalletContainerViewProps) {
  return (
    <View className="flex-1">
      <View className="p-4 gap-4">
        <View className="gap-2">
          <ThemedText type="title" className="mb-2">
            {pallet.title}
          </ThemedText>
          <ThemedText type="default" className="mb-1">
            Ряд: {pallet.rowData.title}
          </ThemedText>
          {pallet.sector && (
            <ThemedText type="default" className="mb-1">
              Сектор: {pallet.sector}
            </ThemedText>
          )}
        </View>

        <View className="flex-row items-center justify-between gap-4">
          <PalletSortControls
            sortParams={sortParams}
            onSortParamsChange={onSortParamsChange}
          />
          <PalletInfo pallet={pallet} />
        </View>
      </View>

      <PosesByPalletFetcher
        palletId={pallet._id}
        sortParams={sortParams}
      />
    </View>
  );
}

