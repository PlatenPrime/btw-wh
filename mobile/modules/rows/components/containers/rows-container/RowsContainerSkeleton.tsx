import { Box } from "@/components/ui";
import { RowCardSkeleton } from "@/modules/rows/components/cards/row-card/RowCardSkeleton";

export function RowsContainerSkeleton() {
  return (
    <Box className="flex-1 p-2">
      {[1, 2, 3, 4].map((i) => (
        <Box key={i} className="mb-2">
          <RowCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}
