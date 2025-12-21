import { Box } from "@/components/ui";

export function RowCardSkeleton() {
  return (
    <Box className="p-4 rounded-lg border border-outline-200 bg-background-0 items-center">
      <Box className="items-center">
        <Box className="h-6 w-24 rounded bg-background-200 mb-2" />
        <Box className="h-4 w-16 rounded bg-background-200" />
      </Box>
    </Box>
  );
}

