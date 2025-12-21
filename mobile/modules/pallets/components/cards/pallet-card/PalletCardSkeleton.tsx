import { Box } from "@/components/ui";

export function PalletCardSkeleton() {
  return (
    <Box className="p-4 rounded-lg border border-outline-200 bg-background-0 gap-2">
      <Box className="flex-row items-center justify-between">
        <Box className="h-5 w-24 rounded bg-background-200" />
        <Box className="h-4 w-16 rounded bg-background-200" />
      </Box>
      <Box className="gap-1">
        <Box className="h-3 w-full rounded bg-background-200" />
        <Box className="h-3 w-3/4 rounded bg-background-200" />
      </Box>
    </Box>
  );
}

