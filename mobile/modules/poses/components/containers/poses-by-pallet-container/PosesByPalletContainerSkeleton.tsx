import { Box } from "@/components/ui";
import { PosCardSkeleton } from "@/modules/poses/components/cards/pos-card/PosCardSkeleton";

export function PosesByPalletContainerSkeleton() {
  return (
    <Box className="flex-1 p-2">
      {[1, 2, 3, 4].map((i) => (
        <Box key={i} className="mb-2">
          <PosCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}

