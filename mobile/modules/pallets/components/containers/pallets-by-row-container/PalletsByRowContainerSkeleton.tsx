import { Box } from "@/components/ui";
import { PalletCardSkeleton } from "@/modules/pallets/components/cards/pallet-card/PalletCardSkeleton";

export function PalletsByRowContainerSkeleton() {
  return (
    <Box className="flex-1 p-2">
      {Array.from({ length: 16 }, (_, index) => index).map((index) => (
        <Box key={index} className="mb-2">
          <PalletCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}

