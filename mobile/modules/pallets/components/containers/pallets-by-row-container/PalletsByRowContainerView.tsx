import { Box } from "@/components/ui";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletsList } from "@/modules/pallets/components/lists/pallets-list/PalletsList";
import { ThemedText } from "@/components/themed-text";

interface PalletsByRowContainerViewProps {
  pallets: PalletShortDto[] | undefined;
  rowId: string;
  isLoading: boolean;
}

export function PalletsByRowContainerView({
  pallets,
  rowId,
  isLoading,
}: PalletsByRowContainerViewProps) {
  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </Box>
    );
  }

  return (
    <Box className="flex-1">
      <PalletsList pallets={pallets} rowId={rowId} />
    </Box>
  );
}

