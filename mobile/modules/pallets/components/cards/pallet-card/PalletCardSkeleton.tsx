import { Box } from "@/components/ui";

export function PalletCardSkeleton() {
  return (
    <Box className="p-4 rounded-lg border border-outline-100 bg-background-0 gap-2">
      <Box className="flex-row items-center justify-between">
        <Box className="rounded bg-secondary-300" style={{ height: 20, width: 96 }} />
        <Box className="rounded bg-secondary-300" style={{ height: 16, width: 64 }} />
      </Box>
      <Box className="gap-1">
        <Box className="rounded bg-secondary-300" style={{ height: 12, width: '100%' }} />
        <Box className="rounded bg-secondary-300" style={{ height: 12, width: '75%' }} />
      </Box>
    </Box>
  );
}

