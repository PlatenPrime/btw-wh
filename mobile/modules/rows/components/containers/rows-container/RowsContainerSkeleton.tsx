import { Box } from "@/components/ui";
import { RowCardSkeleton } from "@/modules/rows/components/cards/row-card/RowCardSkeleton";

export function RowsContainerSkeleton() {
  return (
    <Box className="flex-1 p-2">
      {Array.from({ length: 16 }, (_, index) => index).map((index) => (
        <Box key={index} className="mb-2">
          <RowCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}
