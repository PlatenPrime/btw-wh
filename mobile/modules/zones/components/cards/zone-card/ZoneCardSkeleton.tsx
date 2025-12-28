import { Box } from "@/components/ui";

export function ZoneCardSkeleton() {
  return (
    <Box className="p-4 rounded-lg border border-outline-100 bg-background-0 gap-2">
      <Box className="gap-2">
        <Box
          className="rounded bg-secondary-300"
          style={{ height: 24, width: 96 }}
        />
        <Box className="gap-1">
          <Box
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 120 }}
          />
          <Box
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 80 }}
          />
        </Box>
      </Box>
    </Box>
  );
}

