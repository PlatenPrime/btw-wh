import { Box, VStack } from "@/components/ui";

export function BlockContainerSkeleton() {
  return (
    <VStack className="gap-4 p-2">
      <Box className="p-4 rounded-lg border border-outline-100 bg-background-0">
        <VStack className="gap-2">
          <Box className="rounded bg-secondary-300" style={{ height: 24, width: "75%" }} />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
        </VStack>
      </Box>
      <VStack className="gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Box key={i} className="rounded bg-secondary-300" style={{ height: 96, width: "100%" }} />
        ))}
      </VStack>
    </VStack>
  );
}

