import { Box } from "@/components/ui";

export function PosCardSkeleton() {
  return (
    <Box className="p-4 rounded-lg border border-outline-200 bg-background-0 gap-2">
      <Box>
        <Box className="rounded bg-secondary-300 mb-2" style={{ height: 20, width: 128 }} />
        <Box className="rounded bg-secondary-300 mb-2" style={{ height: 16, width: '100%' }} />
      </Box>
      <Box className="flex-row gap-4">
        <Box className="flex-1">
          <Box className="rounded bg-secondary-300 mb-1" style={{ height: 12, width: 64 }} />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: 80 }} />
        </Box>
        <Box className="flex-1">
          <Box className="rounded bg-secondary-300 mb-1" style={{ height: 12, width: 64 }} />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: 48 }} />
        </Box>
        <Box className="flex-1">
          <Box className="rounded bg-secondary-300 mb-1" style={{ height: 12, width: 64 }} />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: 48 }} />
        </Box>
      </Box>
    </Box>
  );
}

