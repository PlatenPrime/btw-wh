import { Box } from "@/components/ui";

export function ArtGridCardSkeleton() {
  return (
    <Box className="flex-row items-center p-3 rounded-lg border border-outline-200 bg-background-0">
      <Box className="rounded-lg bg-secondary-300" style={{ height: 60, width: 60 }} />
      <Box className="ml-3 flex-1 gap-2">
        <Box className="rounded bg-secondary-300" style={{ height: 16, width: 120 }} />
        <Box className="rounded bg-secondary-300" style={{ height: 14, width: '100%' }} />
        <Box className="rounded bg-secondary-300" style={{ height: 14, width: '80%' }} />
      </Box>
    </Box>
  );
}
