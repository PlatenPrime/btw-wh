import { Box, Button, HStack, Text } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";
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
    <Box className="flex-1">
      <Box className="p-4 gap-4 ">
        <HStack className="items-center justify-between gap-4 flex-wrap">
          <PalletSortControls
            sortParams={sortParams}
            onSortParamsChange={onSortParamsChange}
          />
          <Button onPress={onCreatePosClick} className="rounded-lg">
            <HStack className="items-center gap-2">
              <Icon
                family="MaterialIcons"
                name="add"
                size="md"
                color={SemanticColors.white}
              />
              <Text className="text-white font-semibold text-base">
                Позиція
              </Text>
            </HStack>
          </Button>
          <PalletInfo pallet={pallet} />
        </HStack>
      </Box>

      <PosesByPalletFetcher palletId={pallet._id} sortParams={sortParams} />
    </Box>
  );
}
