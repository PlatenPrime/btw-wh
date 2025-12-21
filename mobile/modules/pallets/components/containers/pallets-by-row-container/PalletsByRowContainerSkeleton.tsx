import { Box } from "@/components/ui";
import { PalletCardSkeleton } from "@/modules/pallets/components/cards/pallet-card/PalletCardSkeleton";

export function PalletsByRowContainerSkeleton() {
  return (
    <Box className="flex-1 p-2">
      {[1, 2, 3, 4].map((i) => (
        <Box key={i} className="mb-2">
          <PalletCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}

