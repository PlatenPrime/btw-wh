import { Box } from "@/components/ui";
import { PosCardSkeleton } from "@/modules/poses/components/cards/pos-card/PosCardSkeleton";

export function PosesByPalletContainerSkeleton() {
  return (
    <Box className="flex-1 p-2">
      {Array.from({ length: 16 }, (_, index) => index).map((index) => (
        <Box key={index} className="mb-2">
          <PosCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}
