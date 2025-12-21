import { Box } from "@/components/ui";
import { ArtsGridSkeleton } from "@/modules/arts/components/lists/arts-grid/ArtsGridSkeleton";

export function ArtsContainerSkeleton() {
  return (
    <Box className="flex-1">
      <Box className="px-4 pt-2 pb-2">
        <Box className="flex-row items-center rounded-lg border border-outline-200 bg-background-0 px-3 gap-2">
          <Box className="rounded bg-secondary-300" style={{ height: 20, width: 20 }} />
          <Box className="flex-1 rounded bg-secondary-300" style={{ height: 48 }} />
        </Box>
      </Box>
      <Box className="flex-1">
        <ArtsGridSkeleton />
      </Box>
    </Box>
  );
}
