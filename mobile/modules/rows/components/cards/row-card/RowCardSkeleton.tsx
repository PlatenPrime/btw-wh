import { Box } from "@/components/ui";

export function RowCardSkeleton() {
  return (
    <Box className="p-4 rounded-lg border border-outline-200 bg-background-0 items-center">
      <Box className="items-center gap-2">
        <Box
          className="rounded bg-secondary-300"
          style={{ height: 24, width: 96 }}
        />
      </Box>
    </Box>
  );
}
