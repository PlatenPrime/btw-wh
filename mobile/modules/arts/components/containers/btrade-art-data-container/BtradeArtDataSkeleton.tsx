import { Box } from "@/components/ui";

export function BtradeArtDataSkeleton() {
  return (
    <Box className="gap-2">
      <Box className="flex-row items-center gap-2">
        <Box className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
        <Box className="rounded bg-secondary-300" style={{ height: 16, width: 48 }} />
      </Box>
      <Box className="flex-row items-center gap-2">
        <Box className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
        <Box className="rounded bg-secondary-300" style={{ height: 16, width: 48 }} />
      </Box>
    </Box>
  );
}

