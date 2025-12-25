import { Box, Card, HStack } from "@/components/ui";

export function PosCardSkeleton() {
  return (
    <Card variant="outlined" className="p-2">
      {/* Header with image, title and menu */}
      <HStack className="items-start justify-between mb-2">
        <Box className="flex-1">
          {/* ArtImageLink skeleton: image + text horizontally */}
          <Box className="flex-row items-start" style={{ gap: 12 }}>
            {/* Image skeleton */}
            <Box
              className="rounded bg-secondary-300"
              style={{ width: 60, height: 60 }}
            />
            {/* Text skeleton */}
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Box
                className="rounded bg-secondary-300 mb-1"
                style={{ height: 16, width: 128 }}
              />
              <Box
                className="rounded bg-secondary-300"
                style={{ height: 14, width: "80%" }}
              />
            </Box>
          </Box>
        </Box>
      </HStack>

      {/* Content with metrics */}
      <Box className="flex-row gap-2">
        <Box className="flex-1">
          {/* PosInfoItem skeleton: icon + text horizontally */}
          <Box className="flex-row items-center justify-center gap-2 rounded-lg p-1 bg-background-100">
            <Box
              className="rounded bg-secondary-300"
              style={{ width: 16, height: 16 }}
            />
            <Box
              className="rounded bg-secondary-300"
              style={{ height: 14, width: 64 }}
            />
          </Box>
        </Box>
        <Box className="flex-1">
          {/* PosInfoItem skeleton: icon + text horizontally */}
          <Box className="flex-row items-center justify-center gap-2 rounded-lg p-1 bg-background-100">
            <Box
              className="rounded bg-secondary-300"
              style={{ width: 16, height: 16 }}
            />
            <Box
              className="rounded bg-secondary-300"
              style={{ height: 14, width: 48 }}
            />
          </Box>
        </Box>
        <Box className="flex-1">
          {/* PosInfoItem skeleton: icon + text horizontally */}
          <Box className="flex-row items-center justify-center gap-2 rounded-lg p-1 bg-background-100">
            <Box
              className="rounded bg-secondary-300"
              style={{ width: 16, height: 16 }}
            />
            <Box
              className="rounded bg-secondary-300"
              style={{ height: 14, width: 48 }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
