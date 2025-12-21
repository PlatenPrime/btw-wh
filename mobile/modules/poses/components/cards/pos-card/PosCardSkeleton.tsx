import { Box } from "@/components/ui";

export function PosCardSkeleton() {
  return (
    <Box className="p-4 rounded-lg border border-outline-200 bg-background-0 gap-2">
      <Box>
        <Box className="h-5 w-32 rounded bg-background-200 mb-2" />
        <Box className="h-4 w-full rounded bg-background-200 mb-2" />
      </Box>
      <Box className="flex-row gap-4">
        <Box className="flex-1">
          <Box className="h-3 w-16 rounded bg-background-200 mb-1" />
          <Box className="h-4 w-20 rounded bg-background-200" />
        </Box>
        <Box className="flex-1">
          <Box className="h-3 w-16 rounded bg-background-200 mb-1" />
          <Box className="h-4 w-12 rounded bg-background-200" />
        </Box>
        <Box className="flex-1">
          <Box className="h-3 w-16 rounded bg-background-200 mb-1" />
          <Box className="h-4 w-12 rounded bg-background-200" />
        </Box>
      </Box>
    </Box>
  );
}

