import { Box, VStack } from "@/components/ui";

export function ZoneBySegmentCardSkeleton() {
  return (
    <VStack className="gap-2">
      <Box className="p-4 rounded-lg border border-outline-100 bg-background-0">
        <Box className="gap-2">
          <Box className="rounded bg-secondary-300" style={{ height: 24, width: "75%" }} />
          <Box className="gap-1">
            <Box className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
            <Box className="h-px bg-outline-200 my-1" />
            <Box className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
          </Box>
        </Box>
      </Box>
      <Box className="pl-2">
        <Box className="rounded bg-secondary-300" style={{ height: 96, width: "100%" }} />
      </Box>
    </VStack>
  );
}

